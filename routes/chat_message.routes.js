const { Router } = require('express');
const handleValidationErrors = require('../middlewares/validator_routes');
const {
    createChatMessage,
    updateChatMessage,
    getChatMessagesByChatId,
    getChatMessageById,
    deleteChatMessage
} = require('../controllers/chat_message.controller');

const chatMessageValidations = require('../middlewares/chatMessage_validator_routes');
const router = Router();

router.post('/',chatMessageValidations.createChatMessage,handleValidationErrors, createChatMessage);       
router.get('/:chatId', getChatMessagesByChatId);           // Read all messages by chatId
router.get('/:id', getChatMessageById);    // Read one
router.put('/:id', updateChatMessage);    // Update
router.delete('/:id', deleteChatMessage); // Delete

module.exports = router;
