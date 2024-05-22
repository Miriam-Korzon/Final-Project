const Course = require("../Schemas/CoursesSchema");
const Register = require("../Schemas/registerSchema")

const getAllCourses = async (req, res) => {

    const courses = await Course.find().lean()
    if (!courses) {
        return res.status(400).json({ message: "לא נמצאו קורסים" })
    }
    res.json(courses)
}
const getCourseById = async (req, res) => {
    const { id } = req.params
    const courses = await Course.findById(id).lean()
    if (!courses) {
        return res.status(400).json({ message: "no courses found" })
    }
    res.json(courses)
}


const createNewCourse = async (req, res) => {//*
    if (req.user.roles != "Admin")
        return res.status(401).json({ message: 'Unauthorized' })

    const { name, code, describe, lecturer, day, startDate, endDate, hours, numOfMeeting, AudienceStatus, Kategory, price } = req.body

    const imageUrl = req.file?.path;

    if (!name || !code || !lecturer) {
        return res.status(400).json({ message: 'שדות חובה' })
    }
    const course_check = await Course.find({ code }).lean()

    if (course_check?.length)
        return res.status(400).json({ message: 'קיים קורס עם קוד זה' })//*

    if (AudienceStatus != "null") {
        if (AudienceStatus != "בוגרות סמינר" & AudienceStatus != "גמלאיות" & AudienceStatus != "נשים נשואות") {
            return res.status(400).json({ message: 'Invalid AudienceStatus' })
        }
    }
    if (Kategory != "null") {
        if (Kategory != "קודש חינוך מודעות" & Kategory != "ערבי עיון והעשרה" & Kategory != "קידום טיפול והתערבות") {
            return res.status(400).json({ message: 'Invalid Kategory' })
        }
    }
    const courses = await Course.create({ name, code, describe, lecturer, day, startDate, endDate, hours, AudienceStatus, Kategory, numOfMeeting, price, image: imageUrl })
    if (courses) {
        return res.status(201).json({ message: "new course created" })
    }
    else {
        return res.status(400).json({ message: "יצירת קורס נכשל" })
    }
}


const deleteCourse = async (req, res) => {
    if (req.user.roles != "Admin")
        return res.status(401).json({ message: 'Unauthorized' })

    const { id } = req.params
    const course = await Course.findById(id).exec()

    if (!course) {
        return res.status(400).json({ message: "no courses found to delete" })
    }
    const registerCourse = await Register.find({ course: course._id })
    if (registerCourse.length) {
        return res.status(404).json({ message: "the course is useful" })//********************************לטיפול***************************** */
    }
    const reply = `Course ${course.name} ID ${course._id} deleted`
    const result = await course.deleteOne()
    res.json(reply)
}
const updateCourse = async (req, res) => {
    if (req.user.roles != "Admin")
        return res.status(401).json({ message: 'Unauthorized' })

    const { _id, name, code, describe, lecturer, day, startDate, endDate, hours, numOfMeeting, AudienceStatus, price } = req.body
    if (!_id || !name) {
        return res.status(400).json({ message: " _id or name not found" })
    }
    // const course_check = await Course.find({ code }).lean()
    const course_check = await Course.findById(_id).lean()
    if(course_check.code!=code)
    {
       const course_check1 = await Course.find({ code }).lean()
       if (course_check1?.length)
        return res.status(400).json({ message: 'קיים קורס עם קוד זה' })
    }

    if(course_check.name!=name)
    {
       const course_check1 = await Course.find({ name }).lean()
       if (course_check1?.length)
        return res.status(400).json({ message: 'קיים קורס עם שם זה' })
    }
    
    const course = await Course.findById(_id).exec()

    course.name = name
    course.code = code
    course.describe = describe
    course.lecturer = lecturer
    course.startDate = startDate
    course.day = day
    course.endDate = endDate
    course.hours = hours
    course.numOfMeeting = numOfMeeting
    course.AudienceStatus = AudienceStatus
    course.price = price
    course.image = req.file ? req.file.path : course.image
    const updatedCourse = await course.save()
    res.json(`'${updatedCourse.name}' updated 😊😊😊`)
}

module.exports = { getAllCourses, getCourseById, createNewCourse, deleteCourse, updateCourse }