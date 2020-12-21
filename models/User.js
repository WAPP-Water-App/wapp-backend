const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    age: Number,
    weight: Number,
    height: Number,
    startTime: Number,
    endTime: Number,
    reminderNumber: Number,
})

const userSchema = new Schema({
    google_id: String,
    access_token: String,
    refresh_token: String,
    id_token: String,
    expiry_date: Number,
    settings: settingsSchema,
})

module.exports = User = mongoose.model('User', userSchema);