const ChatMessage = require('../models/ChatMessage');
const { response } = require("express");

const createChatMessage = async (req, res = response) => {
    const { text, userId, chatId } = req.body;

    try {
        const chatMessage = new ChatMessage({
            text,
            userId,
            chatId
        });
        await chatMessage.save();
        return res.status(201).json({ success: true, data: chatMessage });
    } catch (error) {
        console.error('Error creando el mensaje del chat:', error);
        return res.status(500).json({ success: false, message: 'Error creando el mensaje del chat' });
    }
};

const updateChatMessage = async (req, res = response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedChatMessage = await ChatMessage.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedChatMessage) return res.status(404).json({ success: false, message: 'Mensaje no encontrado' });
        return res.status(200).json({ success: true, data: updatedChatMessage });
    } catch (error) {
        console.error('Error actualizando el mensaje del chat:', error);
        return res.status(500).json({ success: false, message: 'Error actualizando el mensaje del chat' });
    }
};

const getChatMessages = async (req, res = response) => {
    const { id } = req.params;

    try {
        const chatMessages = await ChatMessage.find({ id }).sort({ createdAt: 1 });
        return res.status(200).json({ success: true, data: chatMessages });
    } catch (error) {
        console.error('Error obteniendo los mensajes del chat:', error);
        return res.status(500).json({ success: false, message: 'Error obteniendo los mensajes del chat' });
    }
};

const getChatMessageById = async (req, res = response) => {
    const { id } = req.params;

    try {
        const chatMessage = await ChatMessage.findById(id);
        if (!chatMessage) return res.status(404).json({ success: false, message: 'Mensaje no encontrado' });
        return res.status(200).json({ success: true, data: chatMessage });
    } catch (error) {
        console.error('Error obteniendo el mensaje del chat por ID:', error);
        return res.status(500).json({ success: false, message: 'Error obteniendo el mensaje del chat por ID' });
    }
};

const deleteChatMessage = async (req, res = response) => {
    const { id } = req.params;

    try {
        const deletedChatMessage = await ChatMessage.findByIdAndDelete(id);
        if (!deletedChatMessage) return res.status(404).json({ success: false, message: 'Mensaje no encontrado' });
        return res.status(200).json({ success: true, data: deletedChatMessage });
    } catch (error) {
        console.error('Error eliminando el mensaje del chat:', error);
        return res.status(500).json({ success: false, message: 'Error eliminando el mensaje del chat' });
    }
};

module.exports = {
    createChatMessage,
    updateChatMessage,
    getChatMessages,
    getChatMessageById,
    deleteChatMessage
};
