const { Schema, model } = require('mongoose');

const destinoSchema = new Schema({
  featuredImage: String,
  imageGallery: [String],
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  position: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  googleRating: {
    type: Number,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  userReview: [ // opionion de usuario
    {
      type: Schema.Types.ObjectId,
      ref: 'UserReview'
    }
  ]
}, { timestamps: true });

module.exports = model('Destino', destinoSchema);
