const { Message } = require('../models/models');

const handleError = (res, error) => {
    res.status(500).send('ERROR: ', error.message);
};

const getMessages = (req, res) => {
    Message.findAll({ where: {
        postId: req.params.id,
        messageId: null
    } })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => handleError(res, error));
};

const addMessage = (req, res) => {
    const { author, text } = req.body;
    const { id } = req.params;

    Message.create({ postId: id, author, text })
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

const getMessageToMessage = (req, res) => {
    const { postId, messageId } = req.params;
    Message.findAll({ where: {
        postId: postId,
        messageId: messageId
    } })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => handleError(res, error));
};

const addMessageToMessage = (req, res) => {
    const { author, text, messageId } = req.body;
    const { id } = req.params;

    Message.create({ postId: id, messageId: messageId, author, text })
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

module.exports = {
    getMessages,
    addMessage,
    getMessageToMessage,
    addMessageToMessage
};
