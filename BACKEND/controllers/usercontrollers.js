const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Users = require('../models/usermodels')

//@desc Generate a JWT token for each user to authenticate the CRUD operation
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d',//expires in 30 days
    })
}

//@desc REGISTER A USER
//@route Post /api/users
//@access Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Please add all fields')
    }
    const userExists = await Users.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error ('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await Users.create({
        name, 
        email, 
        password : hashedPassword
    })

    if(user) {
        res.status(200).json({
            _id : user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not created')
    }
})

//$desc LOGIN A USER
//@route Post /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await Users.findOne({email : email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id : user._id, 
            name : user.name, 
            email : user.email, 
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//$desc GET THE INFO OF THE LOGGED IN USER
//@route Get /api/users/me
//@access Private
//using jwt here to protect the routes
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await Users.findById(req.user.id)
    if(!_id) {
        res.status(400)
        throw new Error ("Couldn't fetch data")
    }
    res.status(200).json ({
        id : _id,
        name, 
        email
    })
})


module.exports = {
    registerUser,
    loginUser,
    getMe
}