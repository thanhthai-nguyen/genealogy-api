const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    event: {
        type: String,
        required: true,
        max: 255
    },

    time: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        required: true
    },

    catelogy: {
        type: String,
        required: false,
        max: 255
    },

    group: {
        type: String,
        required: false,
        max: 255
    },

    bio: {
        type: String,
        required: false,
        max: 255
    },

    address: {
        type: String,
        required: false,
        max: 255
    },

    eventImage: {
        type: String,
        required: false,
        max: 255
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

}, {timestamps: true});


mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Events', eventSchema);