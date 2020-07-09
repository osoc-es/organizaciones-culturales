const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Escribe el titulo']
    },
    picture: {
        type: String,
        get: v => `${root}${v}`
    },
    description: String
});

module.exports = mongoose.model('promotions', PromotionSchema);