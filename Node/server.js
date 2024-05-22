require("dotenv").config()
const express = require('express')
const cors = require("cors")
const path = require('path')
const corsOptions = require("./config/corsOptions")
const connectDB=require('./config/dbConn')
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT || 1155

connectDB()
app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(express.json())


app.get('/uploads/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/public/upload/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});

app.use('/uploads', express.static(__dirname + '/public/upload'));
app.use("/api/courseRoute",require("./router/course"))
app.use("/api/registerRoute",require("./router/register"))
app.use("/api/userRoute",require("./router/user"))
app.use("/api/auth", require("./router/auth"))

app.get('/',(req,res)=>{
    res.send("HomePage")
})

app.get('/*',(req,res)=>{
    res.status(404).send('<h1>Resource Not Found</h1>')
    })
mongoose.connection.once('open',()=>{
    console.log('Connected');
    app.listen(PORT, ()=>console.log(`server running on PORT ${PORT} 
    `))

mongoose.connection.on('error', err=>{
    console.log(err);
    })
})
