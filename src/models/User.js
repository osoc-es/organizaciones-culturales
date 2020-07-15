const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
  type: String,
  required: true
},
  edad:{
    type:Number,
    required:true
  },

  localization: { type: mongoose.Schema.Types.ObjectId, ref: 'Locations' },
  prefereneces: [Number],
 /* profilePicture: {
      type: String,
      get: v => `${root}${v}`
    }*/

});

module.exports = mongoose.model('usuarios', UserSchema);
