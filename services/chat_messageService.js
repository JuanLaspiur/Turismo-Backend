const ChatMessage = require('../models/ChatMessage');

const createChatMessage = async (text, userId, chatId) => {
    const chatMessage = new ChatMessage({ text, userId, chatId });
    return await chatMessage.save();
};

const updateChatMessage = async (id, updateData) => {
    return await ChatMessage.findByIdAndUpdate(id, updateData, { new: true });
};

const getChatMessages = async (chatId) => {
    return await ChatMessage.find({ chatId }).sort({ createdAt: 1 });
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
    getChatMessages,
    getChatMessageById,
    deleteChatMessage
};
