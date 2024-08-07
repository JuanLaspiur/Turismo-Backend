const { response } = require('express');
const fs = require('fs');
const path = require('path');
const Tabloide = require('../models/Tabloide');
const sharp = require('sharp');

const getTabloides = async (req, res = response) => {
    try {
        const tabloides = await Tabloide.find();


        res.json({ tabloides });
    } catch (error) {
        res.status(500).json({
            msg: 'Error fetching tabloides',
            error
        });
    }
};

const getTabloideById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const tabloide = await Tabloide.findById(id);

        if (!tabloide) {
            return res.status(404).json({
                msg: 'Tabloide not found'
            });
        }


        res.json({ tabloide });
    } catch (error) {
        res.status(500).json({
            msg: 'Error fetching tabloide',
            error
        });
    }
};

const createTabloide = async (req, res = response) => {
    const { nro_posicion, status, img, ...rest } = req.body;

    try {
        // Crear un nuevo documento de tabloide sin el campo img
        const tabloide = new Tabloide({
            nro_posicion,
            status,
            ...rest
        });
        await tabloide.save();


        if (img && typeof img === 'string') {
           await saveImage(img, tabloide._id);
            tabloide.img =`${tabloide._id}.webp`;
            await tabloide.save();
        }



        res.status(201).json({
            msg: 'Tabloide created successfully',
            tabloide,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error creating tabloide',
            error,
            success: false
        });
    }
};

const updateTabloide = async (req, res = response) => {
    const { id } = req.params;
    const { nro_posicion, status, img, ...rest } = req.body;
    try {
        const tabloide = await Tabloide.findByIdAndUpdate(id, req.body, { new: true });

        if (!tabloide) {
            return res.status(404).json({
                msg: 'Tabloide not found'
            });
        }


        res.json({
            msg: 'Tabloide updated successfully',
            tabloide
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error updating tabloide',
            error
        });
    }
};

const deleteTabloide = async (req, res = response) => {
    const { id } = req.params;
    try {
        const tabloide = await Tabloide.findByIdAndDelete(id);

        if (!tabloide) {
            return res.status(404).json({
                msg: 'Tabloide not found'
            });
        }


        res.json({
            msg: 'Tabloide deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error deleting tabloide',
            error
        });
    }
};

// FUNCIONES DE MODULARIZACION

const saveImage =  async (base64Data, tabloideID) => {
    // "This method is used in the following `uploadProfileImage` and `createUser`."
    const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,/);
    if (!matches || matches.length !== 2) {
      return null
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
  
  
  }

module.exports = {
    getTabloides,
    getTabloideById,
    createTabloide,
    updateTabloide,
    deleteTabloide
};
