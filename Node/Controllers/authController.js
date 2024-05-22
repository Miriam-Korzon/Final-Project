const User = require("../Schemas/UsersSchema")
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')


const login = async (req, res) => {

    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'fields required' })
    }
    const user=await User.findOne({username}).lean()
    if(!user )
        return res.status(401).json({ message: 'Unauthorized' })

    const match=await bcrypt.compare(password,user.password)
    if(!match)
        return res.status(401).json({ message: 'Unauthorized' })
    const userInfo= {_id:user._id,username:user.username, name:user.name, ID:user.ID, email:user.email, phone:user.phone
        , address:user.address, secondPhone:user.secondPhone ,birthDate:user.birthDate,roles:user.roles,active:user.active}
    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken,userInfo})
}

const register = async (req, res) => {
    const { username, password, name, ID, email, phone, address, secondPhone ,birthDate,roles,active } = req.body
    if (!name || !username || !password || !ID || !phone) {
        return res.status(400).json({ message: 'fields required' })
    }
    const double = await User.findOne({ username: username }).lean()
    if (double) {
        return res.status(409).json({ message: "שם משתמש זה אינו חוקי" })
    }
const hashPd=await bcrypt.hash(password,10)
const user={username, password:hashPd, name, ID, email, phone, address, secondPhone ,birthDate,roles,active}
const createdUser=await User.create(user)
if(createdUser){
    userInfo={_id:createdUser._id,username:user.username, name:user.name, ID:user.ID, email:user.email, phone:user.phone
        , address:user.address, secondPhone:user.secondPhone ,birthDate:user.birthDate,roles:user.roles,active:user.active}
    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})
}
else{
    return res.status(400).json({message:`failed`})
}

}
module.exports = { login, register }