
const sendRequest = (req, res, next) => {
  _io.username = req.body.msg
    var result = req.body.msg.indexOf(`/script`);
        if(result > 0) {
          return _io.emit("errormess", "em là Hải đấy anh Tiến :v ko bug dc đâu");
        }
        if(req.body.msg == "/clear") {
          _message = []
         return _io.emit("haine", _message);
        }
        _message.push(req.body)
  _io.emit("haine", _message);
  res.json({ code: 200 });

};


module.exports = sendRequest;

