var express = require('express');
var router = require('./routes');
var app = express()
var path = require("path")
var http = require("http").Server(app)
var io = require("socket.io")(http)
global.__basedir  =  __dirname;
global._io  =  io; 
const PORT = process.env.PORT || 80;
http.listen(PORT, () => {
    console.log("Nodejs is running", PORT);
})

app.use(express.json())

app.use(router)
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'src/index.html'))
} )
app.get((req,res,next) => {
        res.io = io
        next();
})
_io.on("connection", (socket) => {
    
})


