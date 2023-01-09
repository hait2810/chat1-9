var express = require("express");
var routerUser = require('./routes/user')
const mongoose = require('mongoose')
var app = express();
var path = require("path");
var http = require("http").Server(app);
var io = require("socket.io")(http);
global.__basedir = __dirname;
global._io = io;
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
  console.log("Nodejs is running", PORT);
});
var users = [];
var message = [];
app.use(express.json());
const url =
  "mongodb+srv://haidev:ahai2001@cluster0.qh9anyo.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connect succsess");
  } catch (error) {
    console.log(error);
  }
}
connect();
mongoose.set('strictQuery', false);
app.use('/src',express.static(__dirname +'/src'));
app.use(routerUser);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});
app.get("/signup", (req,res) => {
  res.sendFile(path.join(__dirname, "src/signup.html"))
})
app.get("/signin", (req,res) => {
  res.sendFile(path.join(__dirname, "src/signin.html"))
})
app.get((req, res, next) => {
  res.io = io;
  next();
});

var users = [];
var message = [];
_io.on("connection", (socket) => {
      socket.on('useronline', (data) => {
        const userExist = users.find((item) => item._id == data._id)
        if(!userExist) {
          users.push(data)
          socket._iduser = data._id
          _io.sockets.emit('senduseronline', users)
        }
      })
      _io.sockets.emit('senduseronline', users)
      socket.on('sendmessage', (data) => {
           if(data.message == '/cls') {
                message = []
                socket.emit("sendmessserver", message);
           }
           else {
            message.push(data);
            socket.emit("sendmessserver", message);
          }
      })
      socket.emit("sendmessserver", message);
  socket.on("disconnect", () => {
        const userout = users.filter((item) => item._id != socket._iduser)
        users = userout
        _io.sockets.emit('senduseronline', users)
  });
});
