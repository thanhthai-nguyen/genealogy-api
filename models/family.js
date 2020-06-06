const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
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
        trim: true
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
        type: Date,
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

    profileImage: {
        type: String,
        required: false,
        max: 255
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    
    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    }
}, {timestamps: true});


mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Family', familySchema);