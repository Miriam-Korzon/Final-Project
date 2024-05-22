const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    describe:{
        type: String,
    },
    lecturer:{
        type:String,
        required: true,
    },  
    day: {
        type:String, 
    }, 
    startDate:{
        type: String,
    },
    endDate:{
        type: String
    },
    hours:{
        type:String
    },
    numOfMeeting:{
        type: Number,
    },
    
    AudienceStatus:{    
        type:String,    
        enum:["בוגרות סמינר", "גמלאיות", "נשים נשואות"]   ,
        default:"נשים נשואות"
    }, 
    Kategory:{
        type:String,    
        enum:["קודש חינוך מודעות", "ערבי עיון והעשרה", "קידום טיפול והתערבות"],  
        default:"קודש חינוך מודעות",
    },
    price:{
        type:mongoose.Schema.Types.Number
    },
    image:{
        type:String
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Course', coursesSchema)