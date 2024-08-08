const { Schema, model } = require('mongoose');

const reference = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de usuario
        required: true
    },
    img: {
        type: String,
      },
    experienceDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        trim: true,
        maxlength: 500
    }
});

module.exports = model('Reference', reference);
