const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    text:{
        type: String,
        required: true,
    },
    user:{
        type:Schema.Types.Mixed,
        required: true
    },
    state:{
        type: String,
        required: true
    }
    });
module.exports = mongoose.model('Notification',NotificationSchema)