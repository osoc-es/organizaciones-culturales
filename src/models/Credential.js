const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const CredentialSchema = new Schema({
  foreignKey: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Organizaciones',
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Escribe la contrasenia']
  }
});

CredentialSchema.methods.compararPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, sonIguales) => {
    if (err) {
      return cb(err);
    }
    cb(null, sonIguales);
  })
}

module.exports = mongoose.model('Creedenciales', CredentialSchema);
