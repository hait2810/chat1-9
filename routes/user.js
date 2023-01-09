const { signup, signin } = require('../controllers/user')

const express = require('express')
const routerUser = express.Router()

routerUser.post("/signup", signup)
routerUser.post("/signin", signin)

module.exports = routerUser