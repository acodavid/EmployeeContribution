const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean
    },
    firstLogin: {
        type: Boolean,
        default: true
    }
})

module.exports = User = mongoose.model('users', UserSchema);