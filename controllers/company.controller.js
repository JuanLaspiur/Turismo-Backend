const { response } = require('express');
const companyService = require('../services/companyService');

const getCompanies = async (req, res = response) => {
  try {
    const companies = await companyService.getCompanies();
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
};

const getCompanyById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const company = await companyService.getCompanyById(id);
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
};

const createCompany = async (req, res = response) => {
  const { name, description, img, coverImg } = req.body;
  try {
    const company = await companyService.createCompany({ name, description, img, coverImg });
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
};

const updateCompany = async (req, res = response) => {
  const { id } = req.params;
  try {
    const company = await companyService.updateCompany(id, req.body);
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
};

const deleteCompany = async (req, res = response) => {
  const { id } = req.params;
  try {
    await companyService.deleteCompany(id);
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
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
