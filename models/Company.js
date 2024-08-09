const { Schema, model } = require("mongoose");

const companySchema = new Schema({
  name: { 
    type: String,
    required: true 
  },
  description: { 
    type: String,
    required: true 
  },
  img: {
    type: String,
    required: true 
  },
  coverImg: { 
    type: String 
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CompanyService'
    }
  ]
});

module.exports = model("Company", companySchema);

