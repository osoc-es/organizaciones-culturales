const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  localization: { type: mongoose.Schema.Types.ObjectId, ref: 'Locations' },
  prefereneces: [Number]
});

module.exports = mongoose.model('usuarios', UserSchema);
