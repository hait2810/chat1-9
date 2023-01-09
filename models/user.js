const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type:String,
        require: true
    },
    avatar: {
        type:String
    },
    facebook: {
        type: String
    },
    sdt: {
        type:Number
    },
    role: {
        type:Number,
        default: 0
    }
})


module.exports = mongoose.model("Users", userSchema)