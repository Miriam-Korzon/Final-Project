const express=require("express")
const router=express.Router()
const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/public/upload')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000)+".jpg"
//       cb(null, uniqueSuffix)
//     }
//   })
const upload = multer({ dest: './public/upload/' })
// const upload = multer({ storage: storage})

const verifyJWT = require('../MiddleWare/verifyJWT')
const courseController=require("../Controllers/coursesController")

    router.post("/", upload.single('image'), verifyJWT, courseController.createNewCourse)
    router.get("/",courseController.getAllCourses)
    router.get("/:id",courseController.getCourseById)
    router.delete("/:id",verifyJWT,courseController.deleteCourse)
    router.put("/",upload.single('image'),verifyJWT,courseController.updateCourse)

module.exports=router
