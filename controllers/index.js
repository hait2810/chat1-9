
const sendRequest = (req, res, next) => {
  const { msg } = req.body;
  _io.emit("haine", msg);

  res.json({ code: 200 });
};

module.exports = sendRequest;
