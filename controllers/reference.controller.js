// controllers/reference.controller.js
const { response } = require('express');
const referenceService = require('../services/referenceService');

const getReferences = async (req, res = response) => {
  try {
    const references = await referenceService.getReferences();
    res.json({ data: references });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching references',
      error
    });
  }
};

const getReferenceById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const reference = await referenceService.getReferenceById(id);
    if (!reference) {
      return res.status(404).json({
        msg: 'Reference not found'
      });
    }
    res.json({ data: reference });
  } catch (error) {
    res.status(500).json({
      msg: 'Error fetching reference',
      error
    });
  }
};

const createReference = async (req, res = response) => {
  try {
    const reference = await referenceService.createReference(req.body);
    res.status(201).json({
      msg: 'Reference created successfully',
      data: reference,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating reference',
      error,
      success: false
    });
  }
};

const updateReference = async (req, res = response) => {
  const { id } = req.params;
  try {
    const reference = await referenceService.updateReference(id, req.body);
    if (!reference) {
      return res.status(404).json({
        msg: 'Reference not found'
      });
    }
    res.json({
      msg: 'Reference updated successfully',
      data: reference
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error updating reference',
      error
    });
  }
};

const deleteReference = async (req, res = response) => {
  const { id } = req.params;
  try {
    await referenceService.deleteReference(id);
    res.json({
      msg: 'Reference deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error deleting reference',
      error
    });
  }
};

module.exports = {
  getReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference
};
