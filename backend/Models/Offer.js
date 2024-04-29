const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    path:{
        type:Array,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    nb_ppl:{
        type: Number,
        required: false
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
    offeror: {
        type: Schema.Types.Mixed,
        required: true
    },
    state:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Offer',OfferSchema)