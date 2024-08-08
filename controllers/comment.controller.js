const { response } = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const Comment = require("../models/Comment");
const User = require("../models/User");

const getComments = async (req, res = response) => {
  try {
    const comments = await Comment.find();


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
    const comment = await Comment.findById(id);
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
}



const createComment = async (req, res = response) => {
    const { userId, text } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }
        const comment = new Comment({
            userId,
            text
        });

        await comment.save();



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
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({
          msg: "Comment not found",
        });
      }
  
      comment.text = text || comment.text;
  
      await comment.save();
  
      
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
      const comment = await Comment.findByIdAndDelete(id);
      if(!comment) {
        return res.status(404).json({
            msg: 'Comment not found'
        });
      }  
    } catch (error) {
        res.status(500).json({
            msg: 'Error deleting comment',
            error
        }); 
    }
}




module.exports = {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    
};