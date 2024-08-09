const { check } = require("express-validator");

const referenceValidations = {
  createReference: [
    check('userId', 'userId es obligatorio y debe ser un ObjectId válido').isMongoId(),
    check('experienceDate', 'experienceDate es obligatorio y debe ser una fecha YYYY-MM-DD').isDate(),
    check('rating', 'rating es obligatorio y debe estar entre 1 y 5').isInt({ min: 1, max: 5 }),
    check('text', 'text debe ser una cadena con máximo 500 caracteres').optional().isString().trim().isLength({ max: 500 })
  ],
};

module.exports = referenceValidations;