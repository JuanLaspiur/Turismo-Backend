const City = require('../models/City')

const createCity = async (cityData) => {
    const city =new City(cityData);
    return await city.save();
};

const updateCity = async (id, updateData) => {
    return await City.findByIdAndUpdate(id, updateData, { new: true });
};

const getCities = async () => {
    return await City.find();
};

const getCityById = async (id) => {
    return await City.findById(id);
};

const deleteCity = async (id) => {
    return await City.findByIdAndDelete(id);
};

module.exports = {
    createCity,
    updateCity,
    getCities,
    getCityById,
    deleteCity
};