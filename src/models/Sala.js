const mongoose = require('mongoose');
const Schema = mongoose.mongoose.Schema;

const SalaSchema = new Schema({
  localization: {
  type: LocalizationSchema,
  required: [true, 'Localizacion no incluida']
  },
  picture:{
      type: String,
      get: v => `${root}${v}`
    }
});

module.exports = mongoose.model('salas', SalaSchema);
