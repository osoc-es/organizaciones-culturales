const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Escribe el nombre']
  },
  horario: Date,
  telephone: String,
  webPage: String,
  description: String
});

module.exports = mongoose.model('Organizaciones', OrganizationSchema);
