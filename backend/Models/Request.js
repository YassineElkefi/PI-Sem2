const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    sender:{
        type: Schema.Types.Mixed,
        required: true,
    },
    receiver:{
        type: Schema.Types.Mixed,
        required: false
    },
    offer:{
        type:Schema.Types.Mixed,
        required: true
    },
    departure:{
        type: String,
        required: true
    },
    arrival:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true,
        default: "Pending"
    }
});
module.exports = mongoose.model('Request',RequestSchema)