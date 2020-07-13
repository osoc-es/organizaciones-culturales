const mongoose = require('mongoose');
const Image = require('../models/Image');
const Categories = require('../models/Categories');
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
/*    current_capacity: {
        type: Number,
        //required: [true, 'Dime la capacidad actual']
        required: [false, 'Dime la capacidad actual']
    },*/
    price: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Dime el precio']
    },
    main_picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    category: Number,
    tags: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    description: String,
    localization: { type: mongoose.Schema.Types.ObjectId, ref: 'Locations' },
    extraInfo: String,
    target: String,
    map: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    web: String,
    promotions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'promotions' }]
});

module.exports = mongoose.model('events', EventSchema);