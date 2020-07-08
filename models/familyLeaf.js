const mongoose = require('mongoose');

const leafSchema = new mongoose.Schema({
    rootId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'FamilyRoots'
    },

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
        required: false
    },

    lastname: {
        type: String,
        required: 'Your last name is required'
    },

    nickname: {
        type: String,
        required: false,
        max: 255
    },

    sex: {
        type: String,
        required: false,
        max: 255
    },

    dob: {
        type: String,
        required: false,
        max: 255
    },

    domicile: {
        type: String,
        required: false,
        max: 255
    },

    dod: {
        type: String,
        required: false,
        max: 255
    },

    burialplace: {
        type: String,
        required: false,
        max: 255
    },

    profileImage: {
        type: String,
        required: false,
        max: 255
    },

    isSpouse: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

}, {timestamps: true});


mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('FamilyLeaf', leafSchema);