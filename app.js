var express = require("express");
var routerUser = require('./routes/user')
const mongoose = require('mongoose')
var app = express();
var path = require("path");
var moment = require("moment")
const routerChat = require("./routes/chat");
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
app.get("/update/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "src/updateaccount.html"));
});
app.use(routerChat)
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
  const time = moment().format("HH:mm L");  
      socket.on('useronline', (data) => {
        const userExist = users.find((item) => item._id == data._id)
        if(!userExist) {
          users.push(data)
          
                const raw = {
                    id: "63bf8e705f4e6b61f38ddfbf",
                    time,
                    fullname: "Bot",
                    message: "Chào mừng "+data.fullname + " đã tham gia",
                    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712074.png"
                }
                message.push(raw)
          socket._iduser = data._id
          _io.sockets.emit('senduseronline', users)
        }
      })
      _io.sockets.emit('senduseronline', users)
      socket.on('sendmessage', (data) => {
           if(data.message == '/cls' && data._id == "63bcd25fc9447326c0c72778") {
                message = []
                const raw = {
                    id: "63bf8e705f4e6b61f38ddfbf",
                    time,
                    fullname: "Bot",
                    message: "Hệ thống vừa xoá toàn bộ tin nhắn !!!",
                    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712074.png"
                }
                message.push(raw)
                _io.sockets.emit("sendmessserver", message);
           }
           else {
            message.push(data);
            _io.sockets.emit("sendmessserver", message);
          }
      })
      _io.sockets.emit("sendmessserver", message);
      socket.on("senduserlogout", (data) => {
        const userout = users.filter((item) => item._id != data._id)
        users = userout
        _io.sockets.emit('senduseronline', users)
      })
      socket.on('noti', (data) => {
        _io.sockets.emit('senduseronline', users)
        _io.sockets.emit("sendmessserver", message);
      })
  socket.on("disconnect", () => {
        const userout = users.filter((item) => item._id != socket._iduser)
        users = userout
        _io.sockets.emit('senduseronline', users)
  });
});
