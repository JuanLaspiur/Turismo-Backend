const { response } = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Reference = require('../models/Reference');
const User = require('../models/User');

// Obtener todas las referencias
const getReferences = async (req, res = response) => {
    try {
        const references = await Reference.find();
        res.json({ references });
    } catch (error) {
        res.status(500).json({
            msg: 'Error fetching references',
            error
        });
    }
};

// Obtener una referencia por ID
const getReferencesById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const reference = await Reference.findById(id); 
        if (!reference) {
            return res.status(404).json({
                msg: 'Reference not found'
            });
        }
        res.json({ reference });
    } catch (error) {
        res.status(500).json({
            msg: 'Error fetching reference',
            error
        });
    }
};

// Crear una nueva referencia
const createReference = async (req, res = response) => {
  const { userId, img, ...rest } = req.body;

  try {
        const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({
              msg: 'User not found'
          });
      }

      const reference = new Reference({ userId, ...rest });
      await reference.save();

      if (img && typeof img === 'string') {
          await saveImage(img, reference._id);
          reference.img = `${reference._id}.webp`;
          await reference.save();
      }



      res.status(201).json({
          msg: 'Reference created successfully',
          reference,
          success: true
      });
  } catch (error) {
      res.status(500).json({
          msg: 'Error creating reference',
          error,
          success: false
      });
  }
};

// Actualizar una referencia existente
const updateReference = async (req, res = response) => {
    const { id } = req.params;
    const { img, ...updateFields } = req.body;

    try {
        const reference = await Reference.findById(id);
        if (!reference) {
            return res.status(404).json({
                msg: 'Reference not found'
            });
        }

        Object.assign(reference, updateFields);

        if (img && typeof img === 'string') {
            await saveImage(img, reference._id);
            reference.img = `${reference._id}.webp`;
        }

        await reference.save();

        res.json({
            msg: 'Reference updated successfully',
            reference
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error updating reference',
            error
        });
    }
};


const deleteReference = async (req, res = response) => {
    const { id } = req.params;
    try {
        const reference = await Reference.findByIdAndDelete(id);
        if (!reference) {
            return res.status(404).json({
                msg: 'Reference not found'
            });
        }
        res.json({
            msg: 'Reference deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error deleting reference',
            error
        });
    }
};

// Función para guardar la imagen
const saveImage = async (base64Data, referenceID) => {
    const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,/);
    if (!matches || matches.length !== 2) {
        return null;
    }

    const ext = matches[1];
    const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/[a-zA-Z]*;base64,/, ''), 'base64');

    const uploadDir = path.join('./', 'assets', 'references');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${referenceID}.webp`;
    const filePath = path.join(uploadDir, fileName);

    await sharp(imageBuffer)
        .toFormat('webp')
        .toFile(filePath);
};

module.exports = {
    getReferences,
    getReferencesById,
    createReference,
    updateReference,
    deleteReference
};
