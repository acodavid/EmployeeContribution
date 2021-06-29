const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PreferenceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    remoteOrOffice: {
        type: String,
        required: true
    },
    workingFrom: {
        type: String,
        required: true
    },
    workingTo: {
        type: String,
        required: true
    },
    onPauseFrom: {
        type: String,
        required: true
    },
    onPauseTo: {
        type: String,
        required: true
    }
})

module.exports = DailyPreference = mongoose.model('preferences', PreferenceSchema);