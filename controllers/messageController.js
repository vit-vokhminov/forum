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
    const { id } = req.params;
    Message.findAll({ where: {
        postId: id,
        messageId: id
    } })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => handleError(res, error));
};

const addMessageToMessage = (req, res) => {
    const { author, text } = req.body;
    const { id } = req.params;

    console.log('=============================')
    console.log('addMessageToMessage',id,author, text)
    console.log('=============================')

    Message.create({ postId: id, messageId: id, author, text })
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

module.exports = {
    getMessages,
    addMessage,
    getMessageToMessage,
    addMessageToMessage
};
