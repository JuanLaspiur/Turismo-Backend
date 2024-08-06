const { Schema, model } = require('mongoose');

// Esquema de Reserva
const reservaSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value >= new Date(); // Asegura que la fecha no sea en el pasado
      },
      message: 'La fecha de la reserva no puede ser en el pasado.'
    }
  },
  nombreUsuario: {
    type: String,
    required: true
  },
  cantidadPersonas: {
    type: Number,
    required: true,
    min: [1, 'La cantidad de personas debe ser al menos 1']
  },
}, { timestamps: true }); // Agrega createdAt y updatedAt

module.exports = model('Reserva', reservaSchema);
