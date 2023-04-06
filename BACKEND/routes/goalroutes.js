//Implementing the CRUD operation
//get all goals
//create a goal
//update a goal
//delete a goal
const express = require('express')
const router = express.Router()
const { getGoals,
        setGoal, 
        updateGoal, 
        deleteGoal
    } = require('../controllers/goalcontrollers')
const protect = require('../middlewares/authmiddlewares')
    
router.route('/').get(protect, getGoals).post(protect, setGoal)

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);


module.exports = router