// functions to operate on the database Goals

const asyncHandler = require('express-async-handler')
const Goals = require('../models/goalmodels')
const User = require('../models/usermodels')

//@desc GET GOALS
//@route GET /api/goals
//@access PRIVATE
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goals.find({user: req.user.id})

    res.status(200).json(goals);
})

//@desc SET GOALS
//@route POST /api/goals
//@access PRIVATE
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error(`Please add a text`)
    }
    const goal = await Goals.create({
        text : req.body.text,
        user: req.user.id
    })
    res.status(200).json(`Goal created : ${res.json({goal})}`);
})

//@desc UPDATE GOALS
//@route PUT /api/goals/:id
//@access PRIVATE
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goals.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    //Make sure logged in user is same as the user whose goal is to be updated
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updated_goal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
        new : true, // return updated doc
        returnOriginal : true // return original doc
    })
    res.status(200).json(`"${updated_goal.text}" is updated to "${req.body.text}"`);
})

//@desc DELETE GOALS
//@route DELETE /api/goals/:id
//@access PRIVATE
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goals.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error ("Goal not found")
    }
    const user = await User.findById(req.user.id)
     //Check for user
     if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    //Make sure logged in user is same as the user whose goal is to be deleted
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const deleted_goals = await Goals.deleteMany({ _id: req.params.id})

    res.status(200).json(`Deleted ${deleted_goals.deletedCount} goals with id : ${req.params.id}`);
})
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}