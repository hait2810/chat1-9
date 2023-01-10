const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
    userID: {
        type: String,
        require:true
    },
    message: {
        type: String,
        require: true
    },
    fullname: {
        type:String,
        require: true
    },
    time: {
        type:String,
        require: true
    },
    avatar: {
        type: String,
        require:true
    }
})

module.exports = mongoose.model("Chats", chatSchema)