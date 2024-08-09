const { check } = require("express-validator");

const companyServiceValidations = {
    createCompanyService:   [
        check('name', 'El campo name es obligatorio').notEmpty().isString(),
        check('description', 'El campo description es obligatorio').notEmpty().isString(),
        check('img', 'El campo img es obligatorio').notEmpty().isString(), 
        check('price', 'El campo price es obligatorio').notEmpty().isInt(),    
      ],
  };
  
  module.exports = companyServiceValidations;