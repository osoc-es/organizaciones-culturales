const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: String

    // only accept Strings ¯\_(ツ)_/¯

    // max_capacity: Int16Array
    // current_capacity: Int16Array,
    // price: Float32Array
});

module.exports = mongoose.model('events', EventSchema);