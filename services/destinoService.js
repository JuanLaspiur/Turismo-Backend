// services/destinoService.js
const Destino = require('../models/Destino');
 const { saveImage } = require('../helpers/saveImageFunction');


const createDestino = async (body) => {
  const destino = new Destino(body);

 if(body.img){
  await saveImage(body.img, destino._id,"destino-img");
  destino.img = `${destino._id}.webp`;
 }
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
  const destino = await Destino.findByIdAndUpdate(id, body, { new: true });

 if(body.img){
  console.log('Ingresé a update con un body.img: ')

  await saveImage(body.img, id,"destino-img");
  destino.img = `${id}.webp`;
  await destino.save();
 }

  return destino;
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
