const { check } = require("express-validator");

const tabloideValidations = {
  createTabloide: [
    check(
      "nro_posicion",
      "nro_posicion es requerido y debe ser un número entero."
    ).isInt(),
    check("status", "status es requerido y debe ser un número entero.").isInt(),
    check("redirect", "redirect es requerido y debe ser una cadena."),
    check("img", "img debe ser un array de cadenas.").isString(),
  ],
};

module.exports = tabloideValidations;