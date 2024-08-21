const { Router } = require('express');
const handleValidationErrors = require('../middlewares/validator_routes');
const {
    createCity,
    updateCity,
    getCities,
    getCityById,
    deleteCity
} = require('../controllers/city.controller'); 

const citySchema =  require('../middlewares/city_validator_routes');
const router = Router();

router.post('/',citySchema.createCity,handleValidationErrors,createCity);       
router.get('/', getCities);         
router.get('/:id', getCityById);  
router.put('/:id', updateCity);   
router.delete('/:id', deleteCity); 

module.exports = router;