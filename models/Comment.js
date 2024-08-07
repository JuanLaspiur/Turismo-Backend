const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true, 
        maxlength: 1000 },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
    }
});

// Middleware para actualizar `updatedAt` cada vez que el documento se guarda
commentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
