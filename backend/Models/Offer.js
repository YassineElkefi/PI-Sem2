const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    path:{
        type:String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    nb_ppl:{
        type: Number,
        required: true
    },
    nb_pkg:{
        type: Number,
        required: false
    },
    departure_time:{
        type: String,
        required: true
    },
    departure_date:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
});
module.exports = mongoose.model('Offer',RequestSchema)