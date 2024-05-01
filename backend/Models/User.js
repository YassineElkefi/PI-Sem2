const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    cin:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    car:{
        type: String,
        required: false
    },
    nb_strikes:{
        type: Number,
        required: false
    },
    avatar:{
        type: String,
        required: false,
        nullable: true
    },
    });

    module.exports = mongoose.model('User',UserSchema)