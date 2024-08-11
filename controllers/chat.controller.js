const Chat = require('../models/Chat');
const { response } = require("express");

const createChat = async (req, res = response) => {
    const { userId, otherUser } = req.body;

    try {
        const chat = new Chat({
            userId,
            otherUser
        });
        await chat.save();
        return res.status(201).json({ success: true, data: chat });
    } catch (error) {
        console.error('Error creando el chat:', error);
        return res.status(500).json({ success: false, message: 'Error creando el chat' });
    }
};

const updateChat = async (req, res = response) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedChat) return res.status(404).json({ success: false, message: 'Chat no encontrado' });
        return res.status(200).json({ success: true, data: updatedChat });
    } catch (error) {
        console.error('Error actualizando el chat:', error);
        return res.status(500).json({ success: false, message: 'Error actualizando el chat' });
    }
};

const getChats = async (req, res = response) => {
    try {
        const chats = await Chat.find();
        return res.status(200).json({ success: true, data: chats });
    } catch (error) {
        console.error('Error obteniendo los chats:', error);
        return res.status(500).json({ success: false, message: 'Error obteniendo los chats' });
    }
};

const getChatById = async (req, res = response) => {
    const { id } = req.params;

    try {
        const chat = await Chat.findById(id);
        if (!chat) return res.status(404).json({ success: false, message: 'Chat no encontrado' });
        return res.status(200).json({ success: true, data: chat });
    } catch (error) {
        console.error('Error obteniendo el chat por ID:', error);
        return res.status(500).json({ success: false, message: 'Error obteniendo el chat por ID' });
    }
};

const deleteChat = async (req, res = response) => {
    const { id } = req.params;

    try {
        const deletedChat = await Chat.findByIdAndDelete(id);
        if (!deletedChat) return res.status(404).json({ success: false, message: 'Chat no encontrado' });
        return res.status(200).json({ success: true, data: deletedChat });
    } catch (error) {
        console.error('Error eliminando el chat:', error);
        return res.status(500).json({ success: false, message: 'Error eliminando el chat' });
    }
};

module.exports = {
    createChat,
    updateChat,
    getChats,
    getChatById,
    deleteChat
};

