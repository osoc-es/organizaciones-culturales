const mongoose = require('mongoose');
const Schema = mongoose.mongoose.Schema;

const UserSchema = new Schema({
  name: {
  type: String,
  required: true
},
  edad:{
    type:Number,
    required:true
  },
  credentials":{
    type:CredentialSchema,
    required:true
  },
  localization: LocalizationSchema,
  prefereneces: [Number],
  profilePicture: {
      type: String,
      get: v => `${root}${v}`
    }



});

module.exports = mongoose.model('usuarios', UserSchema);
