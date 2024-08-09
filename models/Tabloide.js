const { Schema, model } = require("mongoose");

const tabloideSchema = new Schema({
  nro_posicion: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  up: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  redirect: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

tabloideSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = model("Tabloide", tabloideSchema);
