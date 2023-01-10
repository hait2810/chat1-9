const Chats = require('../models/chat')

const sendChat = async (req,res) => {
   try {
    req.body.userID = req.body._id
    delete req.body._id
    const chat = await Chats(req.body).save()
    res.json({code:200, chat})
   } catch (error) {
        res.status(400).json({message:"Faild"})
   }
}
module.exports = {sendChat}