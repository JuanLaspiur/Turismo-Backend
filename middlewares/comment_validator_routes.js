const { check } = require('express-validator');

const commentValidations = {
   createComment: [
      check('userId','userId es obligatorio y debe ser un ObjectId válido').isMongoId(),
      check('text', 'text debe ser una cadena con máximo 1000 caracteres').optional().isString().trim().isLength({ max: 1000 })
   ]
}
module.exports = commentValidations;