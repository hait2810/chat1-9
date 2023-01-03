
const sendRequest = (req, res, next) => {
  _io.username = req.body.msg
  _io.emit("haine", req.body);
  res.json({ code: 200 });
};


module.exports = sendRequest;

