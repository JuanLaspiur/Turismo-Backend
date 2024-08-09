const { Router } = require('express');
const handleValidationErrors = require('../middlewares/validator_routes');
const {
   getCompaniesServices,
    getCompanyServiceById,
    createCompanyService,
    updateCompanyService,
    deleteCompanyService
} = require('../controllers/company_service.controller');

const companyServiceSchema = require('../middlewares/companyService_validator_routes');
const router = Router();

router.post('/',companyServiceSchema.createCompanyService,handleValidationErrors,createCompanyService);       
router.get('/', getCompaniesServices);         
router.get('/:id', getCompanyServiceById);  
router.put('/:id', updateCompanyService);   
router.delete('/:id', deleteCompanyService); 

module.exports = router;