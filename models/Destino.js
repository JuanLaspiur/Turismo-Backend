const { Schema, model } = require('mongoose');

const destinoSchema = new Schema({
  img: String,
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
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reference: [ // opionion de usuario
    {
      type: Schema.Types.ObjectId,
      ref: 'Reference'
    }
  ],
  comments:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
}, { timestamps: true });

module.exports = model('Destino', destinoSchema);
