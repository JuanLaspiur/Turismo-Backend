// controllers/commentController.js
const { response } = require("express");
const commentService = require("../services/commentService");

const getComments = async (req, res = response) => {
  try {
    const comments = await commentService.getAllComments();

    res.json({ data: comments });
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching comments",
      error,
    });
  }
};

const getCommentById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const comment = await commentService.getCommentById(id);

    if (!comment) {
        return res.status(404).json({
            msg: 'Comment not found'
        });
    }

    res.json({ data: comment });
  } catch (error) {
    res.status(500).json({
        msg: 'Error fetching comment',
        error
    });
  }
};

const createComment = async (req, res = response) => {
    const { userId, text } = req.body;

    try {
        const comment = await commentService.createComment(userId, text);
        
        res.status(201).json({
            msg: 'Comment created successfully',
            data: comment,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error creating comment',
            error,
            success: false
        });
    }
};

const updateComment = async (req, res = response) => {
    const { id } = req.params;
    const { text } = req.body;
  
    try {
      const comment = await commentService.updateComment(id, text);
      res.json({
        msg: "Comment updated successfully",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error updating comment",
        error,
      });
    }
  };

const deleteComment = async (req, res = response) => {
    const { id } = req.params;
    try {
      await commentService.deleteComment(id);
      res.status(200).json({
        msg: 'Comment deleted successfully'
      });
    } catch (error) {
        res.status(500).json({
            msg: 'Error deleting comment',
            error
        }); 
    }
};

module.exports = {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};
