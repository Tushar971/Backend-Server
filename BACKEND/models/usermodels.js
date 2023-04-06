const mongoose = require('mongoose')
//blueprint of the user stored in the database
const userSchema = mongoose.Schema ({
    name : {
        type: String,
        required : [true, 'Please enter a name']
    },
    email : {
        type: String, 
        required : [true, 'Please enter an email id'],
        unique : true
    },
    password : {
        type : String, 
        required : [true, 'Please enter a password']
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Users', userSchema)