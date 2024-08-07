const { Router } = require('express');
const {
  createDestino,
  getDestinos,
  getDestinoById,
  updateDestino,
  deleteDestino
} = require('../controllers/destino.controller');

const router = Router();

router.post('/', createDestino);       // Create
router.get('/', getDestinos);           // Read all
router.get('/:id', getDestinoById);    // Read one
router.put('/:id', updateDestino);    // Update
router.delete('/:id', deleteDestino); // Delete

module.exports = router;
