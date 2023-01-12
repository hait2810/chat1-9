const { signup, signin, update, readUser } = require('../controllers/user')

const express = require('express')
const routerUser = express.Router()

routerUser.post("/signup", signup)
routerUser.post("/signin", signin)
routerUser.put('/user/:id',update)
routerUser.get('/user/:id', readUser)
module.exports = routerUser