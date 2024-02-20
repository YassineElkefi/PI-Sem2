const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    sender:{
        type: String,
        required: true,
    },
    receiver:{
        type: String,
        required: true
    },
    offer:{
        type:String,
        required: true
    },
    departure:{
        type: String,
        required: true
    },
    arrival:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Request',RequestSchema)