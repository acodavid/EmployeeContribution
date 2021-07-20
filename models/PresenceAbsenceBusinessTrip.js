const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PresenceAbsenceBusinessTripSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    remoteOffice: {
        type: String
    },
    workingFrom: {
        type: String
    },
    workingTo: {
        type: String
    },
    onPauseFrom: {
        type: String
    },
    onPauseTo: {
        type: String
    },
    typeOfAbsence: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    placeOfBusinessTrip: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

})

module.exports = PresenceAbsenceBusinessTrip = mongoose.model('presenceAbsenceTrip', PresenceAbsenceBusinessTripSchema);