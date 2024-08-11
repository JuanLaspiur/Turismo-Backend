const { Router } = require('express');
const handleValidationErrors = require('../middlewares/validator_routes');
const {
    createChatMessage,
    updateChatMessage,
    getChatMessages,
    getChatMessageById,
    deleteChatMessage
} = require('../controllers/chat_message.controller');

// const commentValidations = require('../middlewares/comment_validator_routes');
const router = Router();

router.post('/', createChatMessage);       
router.get('/', getChatMessages);           // Read all
router.get('/:id', getChatMessageById);    // Read one
router.put('/:id', updateChatMessage);    // Update
router.delete('/:id', deleteChatMessage); // Delete

module.exports = router;
