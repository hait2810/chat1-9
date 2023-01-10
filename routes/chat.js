const express = require('express')
const { sendChat } = require('../controllers/chat')

const routerChat = express.Router()

routerChat.post("/sendchat", sendChat)

module.exports = routerChat