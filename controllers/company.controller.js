const { response } = require("express");
const Company = require('../models/Company');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const saveImage = async (base64Data, companyID) => {
    const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,/);
    if (!matches || matches.length !== 2) {
      return null;
    }  
    const ext = matches[1];
    const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/[a-zA-Z]*;base64,/, ''), 'base64');
  
    const uploadDir = path.join('./', 'assets', 'companies','img');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  
    const fileName = `${companyID}.webp`;
    const filePath = path.join(uploadDir, fileName);
  
    await sharp(imageBuffer)
      .toFormat('webp')
      .toFile(filePath);
  };

const getCompanies = async (req, res = response) => {
    try {
        const companies = await Company.find();
        res.json({
            success: true,
            data: companies
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener las compañías'
        });
    }
}

const getCompanyById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({
                success: false,
                msg: 'Compañía no encontrada'
            });
        }
        res.json({
            success: true,
            data: company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener la compañía'
        });
    }
}

const createCompany = async (req, res = response) => {
    const { name, description, img, coverImg } = req.body;
    try {
        const company = new Company({ name, description, img, coverImg });
        await company.save();

        if (img && typeof img === 'string') {
            await saveImage(img, company._id);
            company.img = `${company._id}.webp`;
            await company.save();
          }

        res.status(201).json({
            success: true,
            data: company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al crear la compañía'
        });
    }
}

const updateCompany = async (req, res = response) => {
    const { id } = req.params;
    try {
        const company = await Company.findByIdAndUpdate(id, req.body, { new: true });
            if (!company) {
            return res.status(404).json({
                success: false,
                msg: 'Compañía no encontrada'
            });
        }

        if (img && typeof img === 'string') {
            await saveImage(img, company._id);
            company.img = `${company._id}.webp`;
            await company.save();
          }

        res.json({
            success: true,
            data: company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la compañía'
        });
    }
}

const deleteCompany = async (req, res = response) => {
    const { id } = req.params;
    try {
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({
                success: false,
                msg: 'Compañía no encontrada'
            });
        }
        await Company.findByIdAndDelete(id);
        res.json({
            success: true,
            msg: 'Compañía eliminada'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar la compañía'
        });
    }
}

module.exports = {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}
