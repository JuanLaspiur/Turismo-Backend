const { response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const { sendRecoveryEmail } = require('../helpers/mails');
const { generateRecoveryCode } = require('../helpers/recoveryCode');
const sharp = require('sharp');
// firma JWT
const JWT_SECRET = 'turismo_4127';
// ##############################################################################################################################
// ##############################################################################################################################
// ##############################################################################################################################
// ##############################################################################################################################
// ##############################################################################################################################

const saveImage = async (userId, base64Data, uploadDir, oldFileName = null) => {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Decode Base64 data
    const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,/);
    if (!matches || matches.length !== 2) {
      throw new Error('Invalid Base64 data');
    }

    const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/[a-zA-Z]*;base64,/, ''), 'base64');

    // Convert to WebP and save
    const fileName = `${userId}.webp`;
    const filePath = path.join(uploadDir, fileName);

    await sharp(imageBuffer)
      .toFormat('webp')
      .toFile(filePath);

    // Delete old image if it exists
    if (oldFileName) {
      const oldPath = path.join(uploadDir, oldFileName);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    return fileName;
  } catch (error) {
    throw new Error(`Error saving image: ${error.message}`);
  }
};

// ##############################################################################################################################
// ##############################################################################################################################
// ##############################################################################################################################
// ##############################################################################################################################


const getUsers = async (req, res = response) => {
  try {
    const users = await User.find();
    res.json({ users });
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
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
      });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching user',
      error
    });
  }
};

const createUser = async (req, res = response) => {
  const { email, password, img, ...rest } = req.body;
  const uploadDir = path.join('./', 'assets', 'userAvatar');

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        msg: 'Email already registered',
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword, ...rest });

    // Handle image upload if provided
    if (img) {
      const fileName = await saveImage(user._id.toString(), img, uploadDir);
      user.avatar = fileName;
    }

    await user.save();

    res.status(201).json({
      msg: 'User created successfully',
      user,
      success: true,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      msg: 'Error creating user',
      error: error.message || error,
      success: false,
    });
  }
};


const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { email, password, ...rest } = req.body;

  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      rest.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
      });
    }

    res.json({
      msg: 'User updated successfully',
      user,
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
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
      });
    }

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


/*------------------------------------------------------------------------------------------------------------------ */
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Invalid email or password',
        success: false
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: 'Invalid email or password',
        success: false
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      msg: 'Login successful',
      token,
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

// probado y funcionando falta configurar el envio del email
const requestPasswordReset = async (req, res = response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: 'No user found with that email',
        success: false,
      });
    }

    const recoveryCode = generateRecoveryCode();
    user.recoveryToken = recoveryCode;

    await user.save();

    await sendRecoveryEmail(email, recoveryCode);

    res.json({
      msg: 'Password recovery email sent successfully',
      success: true,
      code: recoveryCode

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error requesting password reset',
      error,
      success: false,
    });
  }
};
const resetPassword = async (req, res = response) => {
  const { email, token, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: 'No user found with that email',
        success: false,
      });
    }

    if (user.recoveryToken !== token) {
      return res.status(400).json({
        msg: 'Invalid or expired code',
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.recoveryToken = undefined; 

    await user.save();

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

//


const uploadProfileImage = async (req, res = response) => {
  const { id } = req.params;
  const { base64Data } = req.body;
  const uploadDir = path.join('./', 'assets', 'userAvatar');

  try {
    // Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
        success: false,
      });
    }

    if (!base64Data) {
      return res.status(400).json({
        msg: 'Base64 data is required',
        success: false,
      });
    }

    // Save new image
    const fileName = await saveImage(id, base64Data, uploadDir, user.avatar);

    // Update user with new avatar
    user.avatar = fileName;
    await user.save();

    res.json({
      msg: 'Profile image updated successfully',
      avatar: user.avatar,
      success: true,
    });
  } catch (error) {
    console.error('Error updating profile image:', error);
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
