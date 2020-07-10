const mongoose = require('mongoose');

const categories = new Enum (['cine','teatro','bar','restaurante']);
module.exports = mongoose.model('categories', categories);