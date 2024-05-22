const express=require("express")
const router=express.Router()

const userController=require("../Controllers/userController")
const verifyJWT = require('../MiddleWare/verifyJWT')
    router.get("/",verifyJWT,userController.getAllUsers)
    router.get("/:id",verifyJWT,userController.getUserById)
    router.delete("/:_id",verifyJWT,userController.deleteUser)
    router.put("/",verifyJWT,userController.updateUser)

module.exports=router
