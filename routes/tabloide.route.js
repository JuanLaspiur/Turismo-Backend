const { Router } = require('express');
const {
    getTabloides,
    getTabloideById,
    createTabloide,
    updateTabloide,
    deleteTabloide
} = require('../controllers/tabloide.controller');

const router = Router();

router.post('/', createTabloide);       // Create
router.get('/', getTabloides);           // Read all
router.get('/:id', getTabloideById);    // Read one
router.put('/:id', updateTabloide);    // Update
router.delete('/:id', deleteTabloide); // Delete

module.exports = router;
