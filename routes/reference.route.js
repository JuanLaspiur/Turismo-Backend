const { Router } = require('express');
const {
    getReferences,
    getReferencesById,
    createReference,
    updateReference,
    deleteReference,
} = require('../controllers/reference.controller');

const router = Router();

router.post('/', createReference);    
router.get('/',  getReferences);          
router.get('/:id', getReferencesById);  
router.put('/:id', updateReference);   
router.delete('/:id', deleteReference); 

module.exports = router;