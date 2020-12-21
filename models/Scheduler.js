const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedulerSchema = new Schema({
    "00": [String],
    "01": [String],
    "02": [String],
    "03": [String],
    "04": [String],
    "05": [String],
    "06": [String],
    "07": [String],
    "08": [String],
    "09": [String],
    "10": [String],
    "11": [String],
    "12": [String],
    "13": [String],
    "14": [String],
    "15": [String],
    "16": [String],
    "17": [String],
    "18": [String],
    "19": [String],
    "20": [String],
    "21": [String],
    "22": [String],
    "23": [String]
})

module.exports = Scheduler = mongoose.model('Scheduler', schedulerSchema);