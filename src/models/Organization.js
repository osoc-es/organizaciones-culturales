const mongoose = require('mongoose');
const Schema = mongoose.mongoose.Schema;

const OrganizationSchema = new Schema({
  credentials: {
    type: CredentialSchema,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Escribe el nombre']
  },
  horario: Date,
  localization: LocalizationSchema,
  telephone: String,
  web: String,
  pictures: [{
    type: String,
    get: v => `${root}${v}`
  }],
  description: String,
  salas: [SalaSchema]
});

module.exports = mongoose.model('Organizaciones', OrganizationSchema);
