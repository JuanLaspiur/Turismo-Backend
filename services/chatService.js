const Chat = require('../models/Chat');

const createChat = async (userId, otherUser) => {
    const chat = new Chat({ userId, otherUser });
    return await chat.save();
};

const updateChat = async (id, updateData) => {
    return await Chat.findByIdAndUpdate(id, updateData, { new: true });
};

const getChats = async () => {
    return await Chat.find();
};

const getChatById = async (id) => {
    return await Chat.findById(id);
};

const deleteChat = async (id) => {
    return await Chat.findByIdAndDelete(id);
};

module.exports = {
    createChat,
    updateChat,
    getChats,
    getChatById,
    deleteChat
};
