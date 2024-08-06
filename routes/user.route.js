const { Router } = require('express');
const upload = require('../middlewares/multer');

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

// Rutas para usuarios
router.get('/', getUsers);
router.get('/userId/:id', getUserById);
router.put('/:id', updateUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);

// Ruta para login
router.post('/login', loginUser);

// Rutas para recuperación de contraseñas
router.post('/password-reset/request', requestPasswordReset);
router.post('/password-reset/reset', resetPassword);

// Upload Profile Image
router.post("/upload-profile-image/:id", upload.single('avatar'), uploadProfileImage);

module.exports = router;
