const { Router } = require('express');
const handleValidationErrors = require('../middlewares/validator_routes');
const {
    createChat,
    updateChat,
    getChats,
    getChatById,
    deleteChat
} = require('../controllers/chat.controller');

// const commentValidations = require('../middlewares/comment_validator_routes');
const router = Router();

router.post('/', createChat);       
router.get('/', getChats);           // Read all
router.get('/:id', getChatById);    // Read one
router.put('/:id', updateChat);    // Update
router.delete('/:id', deleteChat); // Delete

module.exports = router;
