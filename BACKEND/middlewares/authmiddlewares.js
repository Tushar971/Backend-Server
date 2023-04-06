//Middlewares are functions that run during the req, res cycle
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Users = require('../models/usermodels')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization &&
       req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            //VERIFY TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //GET USER FROM THE TOKEN
            req.user = await Users.findById(decoded.id).select('-password')
            //removing the password while geting user and storing it into the request object
            //to pass it to the next middlewares functions
            
            next()//calling the next part of the middleware
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = protect