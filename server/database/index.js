const mongoose = require('mongoose');

const eventSchema = require('./models/event');
const eventSpecialSchema = require('./models/event-special');
const userSchema = require('./models/user');

const event = mongoose.model('event', eventSchema, 'events');
const specialEvent = mongoose.model('eventSpecial', eventSpecialSchema, 'specialevents');
const user = mongoose.model('user', userSchema, 'users');

module.exports = {
    event,
    specialEvent,
    user
}