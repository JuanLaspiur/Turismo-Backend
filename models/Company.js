const { Schema, model } = require("mongoose");

const companySchema = Schema({
  name: { type: String },
  description: { type: String },
  img: { type: String },
  coverImg: { type: String },
});

// Falta agregar Catalogo de servicios. 
module.exports = model("Company", companySchema);
