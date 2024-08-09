const { Schema, model } = require("mongoose");

const companySchema = Schema({
  name: { 
    type: String,
    required:true 
},
  description: { 
    type: String,
    required:true 
},
  img: {
     type: String,
     required:true 
     },
  coverImg: { type: String },
});

// Falta agregar Catalogo de servicios. 
module.exports = model("Company", companySchema);

