const { Router } = require('express');
const handleValidationErrors = require('../middlewares/validator_routes');
const {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    
} = require('../controllers/comment.controller');

const commentValidations = require('../middlewares/comment_validator_routes');
const router = Router();

router.post('/', commentValidations.createComment,handleValidationErrors, createComment);       // Create userId text
router.get('/', getComments);           // Read all
router.get('/:id', getCommentById);    // Read one
router.put('/:id', updateComment);    // Update
router.delete('/:id', deleteComment); // Delete

module.exports = router;
