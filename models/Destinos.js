const destinoSchema = new Schema({
    imgDestacada: {
      type: String,
    },
    albumImagenes: [
      {
        type: String
      }
    ],
    nombre: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    posicionGoogle: {
      latitud: {
        type: Number,
        required: true
      },
      longitud: {
        type: Number,
        required: true
      }
    },
    calificacion: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    resenasVisitantes: [resenaSchema], 
    reservas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reserva' 
      }
    ]
  }, { timestamps: true });
  
  module.exports = model('Destino', destinoSchema);
