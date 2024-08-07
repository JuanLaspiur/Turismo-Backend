const { Router } = require('express');
const {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    
} = require('../controllers/comment.controller');


const router = Router();

router.post('/', createComment);       // Create
router.get('/', getComments);           // Read all
router.get('/:id', getCommentById);    // Read one
router.put('/:id', updateComment);    // Update
router.delete('/:id', deleteComment); // Delete

module.exports = router;
