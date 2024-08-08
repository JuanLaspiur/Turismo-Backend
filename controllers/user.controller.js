// controllers/user.controller.js
const { response } = require('express');
const userService = require('../services/userService');

const getUsers = async (req, res = response) => {
  try {
    const users = await userService.getUsers();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching users',
      error
    });
  }
};

const getUserById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
      });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching user',
      error
    });
  }
};

const createUser = async (req, res = response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      msg: 'User created successfully',
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating user',
      error: error.message || error,
      success: false,
    });
  }
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  try {
    const user = await userService.updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
      });
    }
    res.json({
      msg: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error updating user',
      error
    });
  }
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.json({
      msg: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error deleting user',
      error
    });
  }
};

const loginUser = async (req, res = response) => {
  try {
    const token = await userService.loginUser(req.body);
    res.json({
      msg: 'Login successful',
      data: token,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error logging in',
      error,
      success: false
    });
  }
};

const requestPasswordReset = async (req, res = response) => {
  try {
    await userService.requestPasswordReset(req.body);
    res.json({
      msg: 'Password recovery email sent successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error requesting password reset',
      error,
      success: false,
    });
  }
};

const resetPassword = async (req, res = response) => {
  try {
    await userService.resetPassword(req.body);
    res.json({
      msg: 'Password reset successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error resetting password',
      error,
      success: false,
    });
  }
};

const uploadProfileImage = async (req, res = response) => {
  const { id } = req.params;
  try {
    const img = await userService.uploadProfileImage(id, req.body.base64Data);
    res.json({
      msg: 'Profile image updated successfully',
      data: img,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error uploading profile image',
      error: error.message || error,
      success: false,
    });
  }
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

