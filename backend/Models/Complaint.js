const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    object:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.Mixed,
        required: true
    },
    offer:{
        type: Schema.Types.Mixed,
        required: true
    },
    state:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Complaint',ComplaintSchema)