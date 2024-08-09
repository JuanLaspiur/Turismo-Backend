const { check } = require("express-validator");

const destinoValidations = {
    createDestino:   [
        check('name', 'El campo name es obligatorio').notEmpty().isString(),
        check('description', 'El campo description es obligatorio').notEmpty().isString(),
        check('positionGoogle.latitude', 'La latitud es obligatoria y debe ser un número').isFloat(),
        check('positionGoogle.longitude', 'La longitud es obligatoria y debe ser un número').isFloat()
      ],
  };
  
  module.exports = destinoValidations;