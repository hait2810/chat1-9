var express = require("express");
var router = require("./routes");
var app = express();
var path = require("path");
var http = require("http").Server(app);
var io = require("socket.io")(http);
global.__basedir = __dirname;
global._io = io;
const PORT = process.env.PORT || 80;
http.listen(PORT, () => {
  console.log("Nodejs is running", PORT);
});

app.use(express.json());

app.use(router);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});
app.get((req, res, next) => {
  res.io = io;
  next();
});

var users = [];
var message = [];
_io.on("connection", (socket) => {
  socket.on("send_user", (data) => {
    const exitsUser = users.find((item) => item == data);
    if (exitsUser) {
      socket.emit("error");
    } else {
      users.push(data);
      socket.username = data;
      _io.sockets.emit("success", users);
    }
  });
  socket.on("logout", (data) => {
    users = users.filter((item) => item !== data);
    _io.sockets.emit("success", users);
  });

  socket.on("sendmessage", async (data) => {
    if (data.msg == "/clear") {
      message = [];
      socket.emit("haine", message);
    } else {
      message.push(data);
      message.reverse()
      socket.emit("haine", message);
    }
  });
  message.reverse()
  _io.sockets.emit("success", users);
  socket.emit("haine", message);
  socket.on("disconnect", () => {
    users = users.filter((item) => item !== socket.username);
    _io.sockets.emit("success", users);
  });
});
