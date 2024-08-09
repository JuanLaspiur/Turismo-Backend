// services/tabloideService.js
const Tabloide = require('../models/Tabloide');
const { saveImage } = require('../helpers/saveImageFunction');


const getTabloides = async () => {
  return await Tabloide.find();
};

const getTabloideById = async (id) => {
  return await Tabloide.findById(id);
};

const createTabloide = async (body) => {
  const { nro_posicion, status, img, ...rest } = body;

  const tabloide = new Tabloide({
    nro_posicion,
    status,
    ...rest
  });
  await tabloide.save();

  if (img && typeof img === 'string') {
    await saveImage(img, tabloide._id, "tabloide-img");
    tabloide.img = `${tabloide._id}.webp`;
    await tabloide.save();
  }

  return tabloide;
};

const updateTabloide = async (id, body) => {
  const { img, ...updateFields } = body;
  const tabloide = await Tabloide.findById(id);
  if (!tabloide) {
    throw new Error('Tabloide not found');
  }

  Object.assign(tabloide, updateFields);
  if (img && typeof img === 'string') {
    await saveImage(img, tabloide._id, "tabloide-img");
    tabloide.img = `${tabloide._id}.webp`;
  }
  await tabloide.save();

  return tabloide;
};

const deleteTabloide = async (id) => {
  const tabloide = await Tabloide.findByIdAndDelete(id);
  if (!tabloide) {
    throw new Error('Tabloide not found');
  }

  return tabloide;
};

module.exports = {
  getTabloides,
  getTabloideById,
  createTabloide,
  updateTabloide,
  deleteTabloide
};
