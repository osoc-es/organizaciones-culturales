const mongoose = require('mongoose');
const Schema = mongoose.mongoose.Schema;

const CredentialSchema = new Schema({
  email: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         required: 'Email address is required',
         validate: [validateEmail, 'Please fill a valid email address'],
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
     },
  password:{
    type:String,
    required:[true,'Escribe la contrasenia']
  }
});

module.exports = mongoose.model('Creedenciales', CredentialSchema);
