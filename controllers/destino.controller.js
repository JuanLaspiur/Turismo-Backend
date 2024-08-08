const { response } = require('express');
const destinoService = require('../services/destinoService');

const createDestino = async (req, res = response) => {
  try {
    const destino = await destinoService.createDestino(req.body);
    res.status(201).json({
      msg: 'Destination created successfully',
      data: destino,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating destination',
      error,
      success: false,
    });
  }
};

const getDestinos = async (req, res = response) => {
  try {
    const destinos = await destinoService.getDestinos();
    res.json({
      data: destinos,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching destinations',
      error,
      success: false,
    });
  }
};

const getDestinoById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const destino = await destinoService.getDestinoById(id);
    if (!destino) {
      return res.status(404).json({
        msg: 'Destination not found',
        success: false,
      });
    }

    res.json({
      data: destino,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching destination',
      error,
      success: false,
    });
  }
};

const updateDestino = async (req, res = response) => {
  const { id } = req.params;
  try {
    const destino = await destinoService.updateDestino(id, req.body);
    if (!destino) {
      return res.status(404).json({
        msg: 'Destination not found',
        success: false,
      });
    }

    res.json({
      msg: 'Destination updated successfully',
      data: destino,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error updating destination',
      error,
      success: false,
    });
  }
};

const deleteDestino = async (req, res = response) => {
  const { id } = req.params;
  try {
    const destino = await destinoService.deleteDestino(id);
    if (!destino) {
      return res.status(404).json({
        msg: 'Destination not found',
        success: false,
      });
    }

    res.json({
      msg: 'Destination deleted successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error deleting destination',
      error,
      success: false,
    });
  }
};

module.exports = {
  createDestino,
  getDestinos,
  getDestinoById,
  updateDestino,
  deleteDestino,
};
