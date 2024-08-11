const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    otherUser: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    active: {
        type: Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
    }
});
chatSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;