// services/destinoService.js
const Destino = require('../models/Destino');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const saveImage = async (base64Data, destinoID) => {
  const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,/);
  if (!matches || matches.length !== 2) {
    return null;
  }

  const ext = matches[1];
  const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/[a-zA-Z]*;base64,/, ''), 'base64');

  const uploadDir = path.join('./', 'assets', 'destinosImgPrincipal');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${destinoID}.webp`;
  const filePath = path.join(uploadDir, fileName);

  await sharp(imageBuffer)
    .toFormat('webp')
    .toFile(filePath);
};

const createDestino = async (body) => {
  const destino = new Destino(body);

 if(body.img){
  await saveImage(body.img, destino._id);
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

  await saveImage(body.img, id);
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
