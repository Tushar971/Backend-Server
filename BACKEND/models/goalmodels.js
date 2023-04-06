const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user : { //Associate the goals with the user who entered it
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : 'User'
    },
    text : {
        type : String,
        required: [true, 'Please add a text value']
    } 
},{
    timestamps : true
}
)

module.exports = mongoose.model('Goals', goalSchema)