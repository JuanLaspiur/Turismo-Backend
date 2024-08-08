// services/commentService.js
const Comment = require("../models/Comment");
const User = require("../models/User");

const getAllComments = async () => {
    return await Comment.find();
};

const getCommentById = async (id) => {
    return await Comment.findById(id);
};

const createComment = async (userId, text) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const comment = new Comment({
        userId,
        text
    });

    await comment.save();
    return comment;
};

const updateComment = async (id, text) => {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error('Comment not found');
    }

    comment.text = text || comment.text;
    await comment.save();
    return comment;
};

const deleteComment = async (id) => {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
        throw new Error('Comment not found');
    }

    return comment;
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};
