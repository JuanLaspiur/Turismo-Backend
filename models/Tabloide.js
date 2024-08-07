const { Schema, model } = require('mongoose');

const tabloideSchema = new Schema({
  nro_posicion: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  up: {
    type: Boolean,
    required: true,
    default:true,
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  },
  img: [
    {
      type: String,
      required: true
    }
  ],
  description: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  redirect: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  }
});

module.exports = model('Tabloide', tabloideSchema);
