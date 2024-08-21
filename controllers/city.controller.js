const {
    createCity,
    updateCity,
    getCities,
    getCityById,
    deleteCity
} = require('../services/cityService');

const createCity = async (req, res) => {
    try {
        const cityData = req.body;
        const newCity = await createCity(cityData);
        res.status(201).json(newCity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedCity = await updateCity(id, updateData);
        if (!updatedCity) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json(updatedCity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCities = async (req, res) => {
    try {
        const cities = await getCities();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await getCityById(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCity = await deleteCity(id);
        if (!deletedCity) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCity,
    updateCity,
    getCities,
    getCityById,
    deleteCity
};
