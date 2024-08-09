// services/userService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendRecoveryEmail } = require('../helpers/mails');
const { generateRecoveryCode } = require('../helpers/recoveryCode');
const { saveImage } = require('../helpers/saveImageFunction');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;




const getUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const createUser = async (body) => {
  const { email, password, img, ...rest } = body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error('Email already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ email, password: hashedPassword, ...rest });

  if (img) {
    await saveImage(img, user._id, "user-img");
    user.img = `${user._id}.webp`;
  }

  await user.save();
  return user;
};

const updateUser = async (id, body) => {
  const { password, ...rest } = body;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    rest.password = await bcrypt.hash(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest, { new: true });
  if (!user) {
    throw new Error('User not found');
  }

  if(body.img) {
    saveImage(body.img, id, "user-img")
    user.img = `${id}.webp`;
    await user.save();
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const loginUser = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};

const requestPasswordReset = async (body) => {
  const { email } = body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with that email');
  }

  const recoveryCode = generateRecoveryCode();
  user.recoveryToken = recoveryCode;
  await user.save();
  await sendRecoveryEmail(email, recoveryCode);

  return user;
};

const resetPassword = async (body) => {
  const { email, token, newPassword } = body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with that email');
  }

  if (user.recoveryToken !== token) {
    throw new Error('Invalid or expired code');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.recoveryToken = undefined;
  await user.save();

  return user;
};

const uploadProfileImage = async (id, img) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  if (!img) {
    throw new Error('Base64 data is required');
  }

  const fileName = await saveImage(img, id, "user-img");
  if (!fileName) {
    throw new Error('Invalid Base64 data');
  }

  user.img = fileName;
  await user.save();

  return user.img;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
  uploadProfileImage
};
