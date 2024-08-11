const { Schema, model } = require('mongoose');

const chatMessageSchema = new Schema({
  text:{
    type:String
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  chatId:{
    type: Schema.Types.ObjectId,
    ref: 'Chat', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
},
 updatedAt: {
    type: Date,
    default: Date.now, 
}
})

chatMessageSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ChatMessage = model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;