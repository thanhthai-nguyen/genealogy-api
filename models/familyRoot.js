const mongoose = require('mongoose');
const FamilyLeaf = require('../models/familyLeaf');

const rootSchema = new mongoose.Schema({
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

    authoraddress: {
        type: String,
        required: false,
        max: 255
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

    fullname: {
        type: String,
        required: false,
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

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

}, {timestamps: true});

rootSchema.pre('save',  function(next) {
    const person = this;
    const firstname = person.firstname + " ";
    const middlename = person.middlename + " ";
    if (person.middlename != null && person.middlename != "") {

        person.fullname = firstname + middlename + person.lastname;

    }else {

        person.fullname = firstname + person.lastname;

    }
    next();
});

rootSchema.methods.generateFamilyLeaf = function() {
    let payload = {
        userId: this.userId,
        rootId: this._id,
        profileImage: null
    };

    return new FamilyLeaf(payload);
};

mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('FamilyRoots', rootSchema);