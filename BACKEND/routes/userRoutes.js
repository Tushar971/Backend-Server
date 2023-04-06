//Register or Create a user
//Login a user
//get the user info
const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/usercontrollers')
const protect = require('../middlewares/authmiddlewares')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
module.exports = router