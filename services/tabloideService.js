// services/tabloideService.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Tabloide = require('../models/Tabloide');

const saveImage = async (base64Data, tabloideID) => {
  const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,/);
  if (!matches || matches.length !== 2) {
    return null;
  }

  const ext = matches[1];
  const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/[a-zA-Z]*;base64,/, ''), 'base64');

  const uploadDir = path.join('./', 'assets', 'tabloides');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${tabloideID}.webp`;
  const filePath = path.join(uploadDir, fileName);

  await sharp(imageBuffer)
    .toFormat('webp')
    .toFile(filePath);
};

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
    await saveImage(img, tabloide._id);
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
    await saveImage(img, tabloide._id);
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
