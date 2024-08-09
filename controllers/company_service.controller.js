const { response } = require('express');
const companyService = require('../services/company_serviceService');

const getCompaniesServices = async (req, res = response) => {
    try {
        const services = await companyService.getAllServices();
        res.json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

const getCompanyServiceById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const service = await companyService.getServiceById(id);
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

const createCompanyService = async (req, res = response) => {
    const { name, description, img, price } = req.body;
    try {
        const service = await companyService.createService({ name, description, img, price });
        res.status(201).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

const updateCompanyService = async (req, res = response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const service = await companyService.updateService(id, updates);
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

const deleteCompanyService = async (req, res = response) => {
    const { id } = req.params;
    try {
        await companyService.deleteService(id);
        res.json({
            success: true,
            msg: 'Servicio de compañía eliminado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    getCompaniesServices,
    getCompanyServiceById,
    createCompanyService,
    updateCompanyService,
    deleteCompanyService
};
