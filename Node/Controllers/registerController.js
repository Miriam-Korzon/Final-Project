const Register = require("../Schemas/registerSchema");
const User = require("../Schemas/UsersSchema")
const Course = require("../Schemas/CoursesSchema")

const getAllRegisters = async (req, res) => {//
    if(req.user.roles!="Admin")
    return res.status(401).json({message:'Unauthorized'})

    const registers = await Register.find().lean()
    if (!registers) {
        return res.status(400).json({ message: "no registers found" })
    }
    res.json(registers)
}

const getRegisterById = async (req, res) => {//
    if(req.user.roles!="Admin")
        return res.status(401).json({message:'Unauthorized'})
    
    const { id } = req.params
    const registers = await Register.findById(id).lean()
    if (!registers) {
        return res.status(400).json({ message: "no registers found" })
    }
    res.json(registers)
}

const getMyCourses = async (req, res) => {
    const registers = await Register.find({ user: req.user._id }).populate("course").lean();
    if (!registers) {
        return res.status(404).json({ message: "לא נמצאו קורסים ברשותך" })
    }
    res.json(registers)
}

const createNewRegister = async (req, res) => {//*
    let flag=false
    const { user, course, registerDate, paid } = req.body
    const register = await Register.find({ user: req.user._id }, { course: 1 }).populate("course").lean();
    register.map((c) => {
        if (c.course?._id.toString() === course) {
            flag=true
        }
    })
    if(flag){
        return res.status(400).json({ message: 'קורס זה כבר נמצא ברשותך' })
    }
    if (!user || !course) {
        return res.status(400).json({ message: 'שדה חובה' })
    }
    const registers = await Register.create({ user, course, registerDate, paid })
    if (registers) {
        return res.status(201).json({ message: "הרשמה לקורס התבצעה בהצלחה" })
    }
    else {
        return res.status(400).json({ message: "הרשמה לקורס נכשלה" })
    }

}

const deleteRegister = async (req, res) => {
    const { id } = req.params
    const register = await Register.findById(id).exec()
    if (!register) {
        return res.status(400).json({ message: "לא נמצא קורס ברשותך" })
    }
    const reply = `Register ${register.name} ID ${register._id} deleted`
    const result = await register.deleteOne()
    res.json(reply)
}
const updateRegister = async (req, res) => {//
    const { _id, user, registerDate, paid } = req.body
    if (!_id || !user) {
        return res.status(400).json({ message: " _id or name not found" })
    }
    const register = await Register.findById(_id).exec()

    register.registerDate = registerDate
    register.paid = paid

    const updatedRegister = await register.save()
    res.json(`'${updatedRegister.user}' updated 😊😊😊`)
}

module.exports = { getAllRegisters, getRegisterById, getMyCourses, createNewRegister, deleteRegister, updateRegister }