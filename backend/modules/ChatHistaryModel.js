const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userMessage: { type: String, required: false },
    botMessage: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'AccessChat'
});

const AccessChatHistaryModel = mongoose.model('AccessChat', ChatSchema);
module.exports = AccessChatHistaryModel;
