const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = Position = mongoose.model('positions', PositionSchema);