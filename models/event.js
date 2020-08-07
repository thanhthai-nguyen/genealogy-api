const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    event: {
        type: String,
        required: false,
        trim: true,
        max: 255
    },

    time: {
        type: String,
        trim: true,
        required: false
    },

    date: {
        type: String,
        trim: true,
        required: false
    },

    catelogy: {
        type: String,
        required: false,
        trim: true,
        max: 255
    },

    group: {
        type: String,
        required: false,
        trim: true,
        max: 255
    },

    bio: {
        type: String,
        required: false,
        trim: true,
        max: 255
    },

    address: {
        type: String,
        required: false,
        trim: true,
        max: 255
    },

    eventImage: {
        type: String,
        required: false,
        trim: true,
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