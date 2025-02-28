const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
var ChatSchema = new Schema({

    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events'

    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [{
        message: String,
        meta: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            delivered: Boolean
        }]
    }],
    is_group_message: {
        type: Boolean,
        default: false
    },
    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        delivered: Boolean
    }]
});
module.exports = mongoose.model('message', ChatSchema)