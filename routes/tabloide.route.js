const { Router } = require('express');
const {
    getTabloides,
    getTabloideById,
    createTabloide,
    updateTabloide,
    deleteTabloide
} = require('../controllers/tabloide.controller');

const router = Router();

router.post('/', createTabloide);    
router.get('/', getTabloides);          
router.get('/:id', getTabloideById);  
router.put('/:id', updateTabloide);   
router.delete('/:id', deleteTabloide); 

module.exports = router;
