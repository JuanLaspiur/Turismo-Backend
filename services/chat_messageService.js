const ChatMessage = require('../models/ChatMessage');

const createChatMessage = async (text, userId, chatId) => {
    const chatMessage = new ChatMessage({ text, userId, chatId });
    return await chatMessage.save();
};

const updateChatMessage = async (id, updateData) => {
    return await ChatMessage.findByIdAndUpdate(id, updateData, { new: true });
};

const getChatMessagesByChatId = async (chatId) => {
    return await ChatMessage.find({ chatId });
};

const getChatMessageById = async (id) => {
    return await ChatMessage.findById(id);
};

const deleteChatMessage = async (id) => {
    return await ChatMessage.findByIdAndDelete(id);
};

module.exports = {
    createChatMessage,
    updateChatMessage,
    getChatMessagesByChatId,
    getChatMessageById,
    deleteChatMessage
};
