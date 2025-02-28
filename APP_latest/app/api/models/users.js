const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String

    },
    email: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    dateofBirth: {
        type: String

    },
    OTP: {
        type: Number
    },
    password: {
        type: String
    },
    userProfile: {
        type: JSON,
        default: {
            about: String,
            socailprofilelink: String,
            location: String,
            eDuBackground: String,
            workBackround: String,
            imgUrl: String,
            interestsCat: {
                catId: [String],
            },
        }
    },
    EventsHosted: {
        type: Number

    },
    EventsAttened: {
        type: Number

    },
    Reportcount: {
        type: Number
    },
    OTPStatus: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('User', UserSchema);