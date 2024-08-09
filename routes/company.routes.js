const { Router } = require('express');

const {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
} = require('../controllers/company.controller')

const router = Router();

router.post('/', createCompany);       // Create userId text
router.get('/', getCompanies);           // Read all
router.get('/:id', getCompanyById);    // Read one
router.put('/:id', updateCompany);    // Update
router.delete('/:id', deleteCompany); // Delete

module.exports = router;

