// services/referenceService.js
const Reference = require('../models/Reference');
const User = require('../models/User');
const { saveImage } = require('../helpers/saveImageFunction');


const getReferences = async () => {
  return await Reference.find();
};

const getReferenceById = async (id) => {
  return await Reference.findById(id);
};

const createReference = async (body) => {
  const { userId, img, ...rest } = body;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const reference = new Reference({ userId, ...rest });
  await reference.save();

  if (img && typeof img === 'string') {
    await saveImage(img, reference._id,"reference-img");
    reference.img = `${reference._id}.webp`;
    await reference.save();
  }

  return reference;
};

const updateReference = async (id, body) => {
  const { img, ...updateFields } = body;
  const reference = await Reference.findById(id);
  if (!reference) {
    throw new Error('Reference not found');
  }

  Object.assign(reference, updateFields);
  if (img && typeof img === 'string') {
    await saveImage(img, reference._id,"reference-img");
    reference.img = `${reference._id}.webp`;
  }
  await reference.save();

  return reference;
};

const deleteReference = async (id) => {
  const reference = await Reference.findByIdAndDelete(id);
  if (!reference) {
    throw new Error('Reference not found');
  }

  return reference;
};

module.exports = {
  getReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
};
