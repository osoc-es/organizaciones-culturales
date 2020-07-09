const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocalizationSchema = new Schema({
    dir: {
        type: String,
        required: true
    },
    localization: String //Un html
});

module.exports = mongoose.model('localizaciones', LocalizationSchema);