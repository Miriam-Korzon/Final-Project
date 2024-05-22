const User = require("../Schemas/UsersSchema");
const Register =require("../Schemas/registerSchema")

const getAllUsers=async (req,res)=>{
    if(req.user.roles!="Admin")
    return res.status(401).json({message:'Unauthorized'})
    
    const users= await User.find({},{password:0}).lean()
    if(!users){
        return res.status(400).json({message:"אין משתמשים הרשומים במערכת"})
    }
    res.json(users)
}
const getUserById=async (req,res)=>{
    if(req.user.roles!="Admin")
        return res.status(401).json({message:'Unauthorized'})

    const {id}=req.params
    const users = await User.findById(id,{password:0}).lean()
    if(!users){
        return res.status(400).json({message:"לא נמצא משתמש"})
    }
    res.json(users)
}

const deleteUser=async (req,res)=>{
    if(req.user.roles!="Admin")
    return res.status(401).json({message:'Unauthorized'})

    const {_id}=req.params
    const user = await User.findById(_id).exec()

    if(!user){ 
        return res.status(400).json({message:"לא נמצא משתמש למחיקה"})
    }

    const registerUser= await Register.find({user:user._id})
    if(registerUser.length){
        return res.status(404).json({message:"משתמש זה רשום לקורסים אינך יכול למחוק אותו"})
    }
    const reply=`User ${user.username } ID ${user._id} deleted`
    const result= await user.deleteOne()
    res.json(reply)
}

const updateUser=async (req,res)=>{
    if(req.user.roles!="Admin")
    return res.status(401).json({message:'Unauthorized'})

    const {_id,username, name, ID, email, phone, address, secondPhone ,birthDate }=req.body
   
    if(!name || !username || !ID || !phone){ 
        return res.status(400).json({message:"שדות חובה"})
        }
    const user = await User.findById(_id).exec()
    if(user.username!=username){
        const userNames=await (await User.find({},{password:0})).map(use=>use.username)
        if(userNames.includes(username))
            return res.status(400).json({ message: 'שם משתמש זה אינו חוקי' })}
    user.username = username
    user.name=name
    user.ID = ID
    user.email = email
    user.address = address
    user.phone = phone
    user.secondPhone = secondPhone
    user.birthDate = birthDate

    const updatedUser=await user.save()
    res.json(`'${updatedUser.username}' updated 😊😊😊`)
}

module.exports={getAllUsers,getUserById,deleteUser,updateUser}