const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    eventId: {
        type: String
    },
    fromdeviceId: {
        type: String
    },
    toDeviceId: {
        type: String
    },
    fromProfileId: {
        type: String
    },
    toProfileId: {
        type: String
    },
    status: {
        type: Boolean
    },
    MessageStatus: {
        tyepe: Boolean
    }
});
module.exports = mongoose.model('Notify', NotificationSchema)