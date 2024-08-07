const { response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const Destinos = require('../models/Destino');
const sharp = require('sharp');


// Create a new destination
const createDestino = async (req, res = response) => {
  try {
    const destino = new Destinos(req.body);
    await destino.save();
    res.status(201).json({
      msg: 'Destination created successfully',
      destino,
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
    const destinos = await Destinos.find();
    res.json({
      destinos,
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

// Get a single destination by ID
const getDestinoById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const destino = await Destinos.findById(id);
    if (!destino) {
      return res.status(404).json({
        msg: 'Destination not found',
        success: false,
      });
    }
    res.json({
      destino,
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

// Update a destination by ID
const updateDestino = async (req, res = response) => {
  const { id } = req.params;
  try {
    const destino = await Destinos.findByIdAndUpdate(id, req.body, { new: true });
    if (!destino) {
      return res.status(404).json({
        msg: 'Destination not found',
        success: false,
      });
    }
    res.json({
      msg: 'Destination updated successfully',
      destino,
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

// Delete a destination by ID
const deleteDestino = async (req, res = response) => {
  const { id } = req.params;
  try {
    const destino = await Destinos.findByIdAndDelete(id);
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

