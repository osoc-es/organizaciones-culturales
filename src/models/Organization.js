const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  /*credentials :{
    type: mongoose.Schema.Types.ObjectId, ref: 'Creedenciales',
    required:true
  },*/

  name: {
    type: String,
    required: [true, 'Escribe el nombre']
  },

  horario: Date,

// location: { type: mongoose.Schema.Types.ObjectId, ref: 'Locations' },

  telephone: String,

  webPage: String,

  /*pictures: [{
    type: String,
    get: v => `${root}${v}`
  }],*/

  description: String,

  //salas: [SalaSchema]
});

module.exports = mongoose.model('Organizaciones', OrganizationSchema);
