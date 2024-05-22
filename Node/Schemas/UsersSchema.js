const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    ID: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    },
    secondPhone: {
        type: String,
    },
    birthDate:{
        type: mongoose.Schema.Types.Date,
    },
    address:{
        type: String,
    },
    roles: {
        type: String,
        enum: ['User', 'Admin'],
        default: "User",
        immutable: true
    },
    active: {
        type: Boolean,
        default: false,
    }
}, {
     timestamps: true 
})
module.exports = mongoose.model("User", userSchema)
