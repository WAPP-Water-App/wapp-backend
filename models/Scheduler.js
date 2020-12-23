const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedulerSchema = new Schema({
  time: Number,
  users: [String],
});

module.exports = Scheduler = mongoose.model('Scheduler', schedulerSchema);
