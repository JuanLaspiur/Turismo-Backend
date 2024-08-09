const { check } = require('express-validator');

const userValidations = {
  createUser: [
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('lastname', 'Apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('birthdate', 'Fecha de nacimiento es obligatoria YYYY-MM-DD').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
  ],
  loginUser: [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
  ],
  requestPasswordReset: [
    check('email', 'El correo es obligatorio y debe ser válido').isEmail(),
  ],
  uploadProfileImage: [
    check('img', 'La imagen es obligatoria. "img" en formato Base64').not().isEmpty(),
  ]
};

module.exports = userValidations;
