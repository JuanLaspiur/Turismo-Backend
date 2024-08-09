const { Schema, model } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'Nombre es obligatorio'],
  },
  lastname: {
    type: String,
    required: [true, 'Apellido es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  birthdate: {
    type: Date,
    required: [true, 'Fecha de nacimiento es obligatoria'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE', 'GUEST_ROLE','COMPANY_ROLE'],
  },
  avatar: {
    type: String,
  },
  recoveryToken: {
    type: String,
  }
});

module.exports = model('User', userSchema);
