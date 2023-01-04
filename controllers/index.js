
const sendRequest = (req, res, next) => {
  _io.username = req.body.msg
        if(req.body.msg == "/clear") {
          return _message = []
        }
        _message.push(req.body)
  //_io.sockets.emit("message", message);
 // res.json({ code: 200 });

};


module.exports = sendRequest;

