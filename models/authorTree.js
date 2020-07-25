const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    treename: {
        type: String,
        required: 'Genealogy name is required',
        max: 255
    },

    author: {
        type: String,
        required: 'User create is required',
        max: 255
    },

    address: {
        type: String,
        required: false,
        max: 255
    },

    profileImage: {
        type: String,
        required: false,
        max: 255
    },
    
    numGen: {
        type: Number,
        required: false,
        max: 255
    },

    numMem: {
        type: Number,
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
module.exports = mongoose.model('Author', authorSchema);