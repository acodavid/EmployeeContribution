const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    firstLogin: {
        type: Boolean,
        default: true
    },
    preferenceCreated: {
        type: Boolean,
        default: false
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    typeOfPosition: {
        type: String,
        required: true
    },
    hiredDate: {
        type: Date,
        required: true
    },
    contractDuration: {
        type: String, 
        required: true
    },
    terminationDate: {
        type: Date
    },
    orgLevel: [String],
    status: {
        type: String,
        required: true
    },
    durationOfPreviousService: {
        type: String,
        required: true
    },
    linkToPersonalFolder: {
        type: String
    },
    userCreatedDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema);