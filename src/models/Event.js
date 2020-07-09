const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Dime el nombre']
    },
    max_capacity: {
        type: Number,
        required: [true, 'Dime la capacidad maxima']
    },
    current_capacity: {
        type: Number,
        //required: [true, 'Dime la capacidad actual']
        required: [false, 'Dime la capacidad actual']
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Dime el precio']
    },
    pictures: [{
        type: String,
        get: v => `${root}${v}`
    }],
    preference: Number,
    tags: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    description: String,
    localization: { type: mongoose.Schema.Types.ObjectId, ref: 'localizaciones' },
    extraInfo: String,
    objetive: String,
    map: {
        type: String,
        get: v => `${root}${v}`
    },
    web: String,
    promotions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'promotions' }]
});

module.exports = mongoose.model('events', EventSchema);