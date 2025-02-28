const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    tittle: {
        type: String
    },
    imgUrl: {
        type: String
    },
    contactInfo: {
        type: String
    },
    event_date: {
        type: Date
    },
    eventTime: {
        type: String
    },
    created_on: {
        type: String
    },
    Description: {
        type: String
    },
    guideLines: {
        type: String
    },
    Eventlocation: {
        type: String
    },
    City: {
        type: String
    },
    locationCorodiantes: {
        type: JSON,
        default: {
            latitude: String,
            longitude: String
        }
    },
    event_category: {
        type: [String]
    },
    Tags: {
        type: [String]
    },
    UserProfileID: {
        type: String
    },
    aditionalImgOrVideo: {
        type: [String]
    },
    JoinCount: {
        type: Number
    },
    reportCount: {
        type: Number
    }
});
module.exports = mongoose.model('Event', EventSchema)