const { Router } = require('express');
const handleValidationErrors = require("../middlewares/validator_routes");


const {
  createDestino,
  getDestinos,
  getDestinoById,
  updateDestino,
  deleteDestino
} = require('../controllers/destino.controller');


const destinoValidations = require("../middlewares/destino_validator_routes");
const router = Router();

router.post('/',destinoValidations.createDestino ,handleValidationErrors,createDestino);       // Create
router.get('/', getDestinos);           // Read all
router.get('/:id', getDestinoById);    // Read one
router.put('/:id', updateDestino);    // Update
router.delete('/:id', deleteDestino); // Delete

module.exports = router;
