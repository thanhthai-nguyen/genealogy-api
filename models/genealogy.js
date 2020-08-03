const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Author'
    },

    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },

    spouseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },


    isSpouse: {
        type: Boolean,
        default: false
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
        max: 50
    },

    sex: {
        type: String,
        required: false,
    },

    numphone: {
        type: String,
        required: false,
        trim: true,
        max: 15
    },

    dob: {
        type: String,
        required: false,
        max: 100
    },

    domicile: {
        type: String,
        required: false,
        max: 100
    },

    dod: {
        type: String,
        required: false,
        max: 100
    },

    burialplace: {
        type: String,
        required: false,
        max: 100
    },

    rank: {
        type: Number,
        required: false,
    },

    profileImage: {
        type: String,
        required: false,
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

}, {timestamps: true});

treeSchema.pre('save',  function(next) {
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


mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Genealogy', treeSchema);