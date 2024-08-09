const { response } = require("express");
const CompanyService = require('../models/CompanyService');

const getCompaniesServices = async (req, res = response) => {
    try {
        const services = await CompanyService.find();
        res.json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener los servicios de compañías'
        });
    }
};

const getCompanyServiceById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const service = await CompanyService.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                msg: 'Servicio de compañía no encontrado'
            });
        }
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener el servicio de compañía'
        });
    }
};

const createCompanyService = async (req, res = response) => {
    const { name, description, img, price } = req.body;
    try {
        const service = new CompanyService({ name, description, img, price });
        await service.save();
        res.status(201).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al crear el servicio de compañía'
        });
    }
};

const updateCompanyService = async (req, res = response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const service = await CompanyService.findByIdAndUpdate(id, updates, { new: true });
        if (!service) {
            return res.status(404).json({
                success: false,
                msg: 'Servicio de compañía no encontrado'
            });
        }
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el servicio de compañía'
        });
    }
};

const deleteCompanyService = async (req, res = response) => {
    const { id } = req.params;
    try {
        const service = await CompanyService.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                msg: 'Servicio de compañía no encontrado'
            });
        }
        await CompanyService.findByIdAndDelete(id);
        res.json({
            success: true,
            msg: 'Servicio de compañía eliminado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar el servicio de compañía'
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
