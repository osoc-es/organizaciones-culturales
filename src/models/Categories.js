const mongoose = require('mongoose');
 
const categories = {
    CINEMA: 0,
    THEATER: 1,
    GASTRONOMY: 2,
    MUSSEUM: 3
    /* ... */
}
 
module.exports = mongoose.model('categories', categories);