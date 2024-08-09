// controllers/tabloide.controller.js
const { response } = require('express');
const tabloideService = require('../services/tabloideService');

const getTabloides = async (req, res = response) => {
  try {
    const tabloides = await tabloideService.getTabloides();
    res.json({ data: tabloides });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching tabloides',
      error
    });
  }
};

const getTabloideById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const tabloide = await tabloideService.getTabloideById(id);
    if (!tabloide) {
      return res.status(404).json({
        msg: 'Tabloide not found'
      });
    }
    res.json({ data: tabloide });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching tabloide',
      error
    });
  }
};

const createTabloide = async (req, res = response) => {
  try {
    console.log('[depure] Entré al metodo crearTalbloide')
    const tabloide = await tabloideService.createTabloide(req.body);
    res.status(201).json({
      msg: 'Tabloide created successfully',
      data: tabloide,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating tabloide',
      error,
      success: false
    });
  }
};

const updateTabloide = async (req, res = response) => {
  const { id } = req.params;
  try {
    const tabloide = await tabloideService.updateTabloide(id, req.body);
    if (!tabloide) {
      return res.status(404).json({
        msg: 'Tabloide not found'
      });
    }
    res.json({
      msg: 'Tabloide updated successfully',
      data: tabloide
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error updating tabloide',
      error
    });
  }
};

const deleteTabloide = async (req, res = response) => {
  const { id } = req.params;
  try {
    await tabloideService.deleteTabloide(id);
    res.json({
      msg: 'Tabloide deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error deleting tabloide',
      error
    });
  }
};

module.exports = {
  getTabloides,
  getTabloideById,
  createTabloide,
  updateTabloide,
  deleteTabloide
};

