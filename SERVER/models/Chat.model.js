const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    lastMessage: {
        type: String
    },  
    lastMessageTime: {
        type: Date
    },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;

