const { Router } = require('express');
const { check } = require('express-validator');
const handleValidationErrors = require('../middlewares/validator_routes');
// Controladores
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
  uploadProfileImage,
} = require('../controllers/user.controller');

const router = Router();


router.post(
  '/',
  [
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('lastname', 'Apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('birthdate', 'Fecha de nacimiento es obligatoria').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
  ],
  handleValidationErrors,
  createUser
);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);





// Ruta para login
router.post('/login',
[
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
],
handleValidationErrors,
loginUser
);

// Rutas para recuperación de contraseñas
router.post(
  '/password-reset/request',
  [
    check('email', 'El correo es obligatorio y debe ser válido').isEmail(),
  ],
  handleValidationErrors,
  requestPasswordReset
);
router.post('/password-reset/reset', resetPassword);

// Upload Profile Image
router.post(
  '/upload-profile-image/:id',
  [
    check('img', 'La imagen es obligatoria').not().isEmpty(),
  ],
  handleValidationErrors,
  uploadProfileImage
);


module.exports = router;
