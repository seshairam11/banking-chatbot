const mongoose = require('mongoose');

const PassageSchema = new mongoose.Schema({
    question: { type: String, required: false, trim: true },
    answer: { type: String, required: false, trim: true },
    userType: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'AccessPassage'
});

const AccessPassageModel = mongoose.model('AccessPassage', PassageSchema);
module.exports = AccessPassageModel;
