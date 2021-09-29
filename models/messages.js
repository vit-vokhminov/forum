const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema(
    {
        author: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages;
