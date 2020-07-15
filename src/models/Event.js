const mongoose = require('mongoose');
const Image = require('../models/Image');
const Categories = require('../models/Categories');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: [true, 'Dime el nombre']
    },

    price: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Dime el precio']
    },
    category: Number,
    main_picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    tags: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    description: String,
    localization: { type: mongoose.Schema.Types.ObjectId, ref: 'Locations' },
    extraInfo: String,
    target: Number,
    web: String,
    promotions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'promotions' }]
});

module.exports = mongoose.model('Events', EventSchema);