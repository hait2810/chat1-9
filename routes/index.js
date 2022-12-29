const express = require('express');

const sendRequest = require('../controllers');
const path = require("path")
const router = express.Router();
router.post('/send', sendRequest)

module.exports = router