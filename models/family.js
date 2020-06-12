const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    firstname: {
        type: String,
        required: 'Your first name is required',
        trim: true
    },

    middlename: {
        type: String,
        required: false,
        trim: true
    },

    lastname: {
        type: String,
        required: 'Your last name is required',
        trim: true
    },

    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        ref: 'User'
    },

    nickname: {
        type: String,
        required: false,
        max: 255
    },

    numphone: {
        type: String,
        required: false,
        max: 255
    },

    sex: {
        type: String,
        required: false,
        max: 255
    },
    
    datebirth: {
        type: String,
        required: false,
    },

    address: {
        type: String,
        required: false,
        max: 255
    },

    job: {
        type: String,
        required: false,
        max: 255
    },

    parentage: {
        type: String,
        required: false,
        max: 255
    },

    yourself: {
        type: String,
        required: false,
        max: 255
    },

    relatives: {
        type: String,
        required: false,
        max: 255
    },

    nation: {
        type: String,
        required: false,
        max: 255
    },

    religion: {
        type: String,
        required: false,
        max: 255
    },

    profileImage: {
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
module.exports = mongoose.model('Family', familySchema);