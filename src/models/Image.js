const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    ismap:{ type: Boolean, required: true}, //true es mapa, false es imagen
    photo: {
        type: Buffer
    },
    foreingKey: {type: mongoose.Schema.Types.ObjectId, ref: 'Events',required: true}
});

ImageSchema.methods.toJSON = function () {
    const result = this.toObject();
    delete result.photo;
    return result;
};

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
