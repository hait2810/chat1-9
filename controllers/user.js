const Users = require('../models/user')


const signup = async (req,res) => {
       try {
        const {username} = req.body
        const exitsUser = await Users.findOne({username}).exec()
        if(exitsUser) {
            return res.json({code: 400, message: "Account already exists!"})
        }
        const user = await Users(req.body).save()
        res.json({code:200, user: {
            _id: user._id,
            username: user.username,
            fullname: user.fullname
        }})
       } catch (error) {
            res.status(400).json({message: "Registration failed!"});
       }
}
const signin = async (req,res) => {
    try {
        const {username, password} = req.body
        const user = await Users.findOne({username}).exec()
        if(!user) {
            return res.json({
                code: 400,
                message: "Account does not exist!"
            })
        }
        if(user.password != password) {
            return res.json({
                code: 400,
                message: "Wrong password!"
            })
        } 
        res.json({code:200, user: {
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            avatar: user.avatar,
            role: user.role,
            facebook: user.facebook,
            sdt: user.sdt

        }})
    } catch (error) {
        res.status(400).json({message: "Login failed!"});
    }
}
const update = async (req,res) => {
        try {
            const user = await Users.findByIdAndUpdate({_id: req.params.id}, req.body, {returnDocument: 'after'}).exec()
            res.json({code:200, user: {
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                facebook: user.facebook,
                avatar: user.avatar,
                sdt: user.sdt
    
            }})
        } catch (error) {
            res.status(400).json(error)
        }
}
const readUser = async (req,res) => {
    try {
        const user = await Users.findById({_id: req.params.id}).exec() 
        res.json({code: 200,user: {
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            facebook: user.facebook,
            avatar: user.avatar,
            sdt: user.sdt

        }})
    } catch (error) {
        res.status(400).json(error)
    }
}
module.exports = {signup,signin,update, readUser}