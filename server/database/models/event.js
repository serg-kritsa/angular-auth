const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  // _id: Object,
  name: String,
  description: String,
  date: Date
});

module.exports = eventSchema;