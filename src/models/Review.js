const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    score: {
        type: mongoose.Types.Decimal128,
        required: [true, "Pon la valoracion"]
    },
    text: String
});

module.exports = mongoose.model('Review', ReviewSchema);