const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbsenceTypeSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = AbsenceType = mongoose.model('absenceType', AbsenceTypeSchema);