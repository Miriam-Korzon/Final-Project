const express=require("express")
const router=express.Router()

const registerController=require("../Controllers/registerController")
const verifyJWT = require('../MiddleWare/verifyJWT')


    router.get("/",verifyJWT,registerController.getAllRegisters) 
    router.get("/myCourses",verifyJWT,registerController.getMyCourses)
    router.get("/:id",verifyJWT,registerController.getRegisterById)
    router.post("/",verifyJWT,registerController.createNewRegister)
    router.delete("/:id",registerController.deleteRegister)
    router.put("/",registerController.updateRegister)

module.exports=router
