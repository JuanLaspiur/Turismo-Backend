// services/destinoService.js
const Destino = require('../models/Destino');

const createDestino = async (body) => {
  const destino = new Destino(body);
  await destino.save();
  return destino;
};

const getDestinos = async () => {
  return await Destino.find();
};

const getDestinoById = async (id) => {
  return await Destino.findById(id);
};

const updateDestino = async (id, body) => {
  return await Destino.findByIdAndUpdate(id, body, { new: true });
};

const deleteDestino = async (id) => {
  return await Destino.findByIdAndDelete(id);
};

module.exports = {
  createDestino,
  getDestinos,
  getDestinoById,
  updateDestino,
  deleteDestino,
};
