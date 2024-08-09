const CompanyService = require('../models/CompanyService');
const { saveImage } = require('../helpers/saveImageFunction');

const getAllServices = async () => {
    try {
        return await CompanyService.find();
    } catch (error) {
        throw new Error('Error al obtener los servicios de compañías');
    }
};

const getServiceById = async (id) => {
    try {
        const service = await CompanyService.findById(id);
        if (!service) {
            throw new Error('Servicio de compañía no encontrado');
        }
        return service;
    } catch (error) {
        throw new Error('Error al obtener el servicio de compañía');
    }
};

const createService = async ({ name, description, img, price }) => {
    try {
        const service = new CompanyService({ name, description, img, price });

        if (img && typeof img === 'string') {
            await saveImage(img, service._id, "companyService-img");
            service.img = `${service._id}.webp`;
        }

        await service.save();
        return service;
    } catch (error) {
        throw new Error('Error al crear el servicio de compañía');
    }
};

const updateService = async (id, updates) => {
    try {
        const service = await CompanyService.findByIdAndUpdate(id, updates, { new: true });
        if (!service) {
            throw new Error('Servicio de compañía no encontrado');
        }

        if (updates.img && typeof updates.img === 'string') {
            await saveImage(updates.img, service._id, "companyService-img");
            service.img = `${service._id}.webp`;
        }

        await service.save();
        return service;
    } catch (error) {
        throw new Error('Error al actualizar el servicio de compañía');
    }
};

const deleteService = async (id) => {
    try {
        const service = await CompanyService.findById(id);
        if (!service) {
            throw new Error('Servicio de compañía no encontrado');
        }
        await CompanyService.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error al eliminar el servicio de compañía');
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
