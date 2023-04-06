const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errormiddlewares')
const connectDB = require('./config/db')

connectDB();

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false})) 
//extended : false is to use querystring library to parse the incoming data
//extended : true is to use qs library(third-party) to parse complex data

app.use('/api/goals', require('./routes/goalroutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}...`))


/*
dotenv 
errorhandler
urlencoded
asyncHandler
*/