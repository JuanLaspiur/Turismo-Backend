const { Schema, model } = require("mongoose");

const companyServiceSchema = Schema({
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
  price: { 
    type: Number,
    required:true 
   },
});

module.exports = model("CompanyService", companyServiceSchema);