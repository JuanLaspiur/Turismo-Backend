const { Schema, model } = require('mongoose');

const citySchema = new Schema({
    imageGallery: [String],
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    positionGoogle: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    }});

const City = model('City', citySchema);

module.exports = City;