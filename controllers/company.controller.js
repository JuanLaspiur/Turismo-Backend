const { response } = require("express");
const Company = require('../models/Company');

const getCompanies = async (req, res = response) => {
    try {
        const companies = await Company.find();
        res.json({
            ok: true,
            companies
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
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
                ok: false,
                msg: 'Compañía no encontrada'
            });
        }
        res.json({
            ok: true,
            company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la compañía'
        });
    }
}

const createCompany = async (req, res = response) => {
    const { name, description, img, coverImg } = req.body;
    try {
        const company = new Company({ name, description, img, coverImg });
        await company.save();
        res.status(201).json({
            ok: true,
            company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
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
                ok: false,
                msg: 'Compañía no encontrada'
            });
        }
        res.json({
            ok: true,
            company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
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
                ok: false,
                msg: 'Compañía no encontrada'
            });
        }
        await Company.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Compañía eliminada'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
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
