const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    google_id: String,
    date: Date,
    progress: Number,
    weekday: String,
    status: [String]
})

module.exports = Data = mongoose.model('Data', dataSchema);