const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    photo: {
        type: Buffer
    },
});

ImageSchema.methods.toJSON = function () {
    const result = this.toObject();
    delete result.photo;
    return result;
};

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
