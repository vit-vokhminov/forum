const Router = require('express');
const router = new Router();
const {
    getMessages,
    addMessage,
    getMessageToMessage,
    addMessageToMessage
} = require('../controllers/messageController');

// Получить все комментарии поста
router.get('/messages/:id', getMessages);
// Добавить комментарий
router.post('/message/:id', addMessage);
// Получить все ответы на комментарий
router.get('/answers/:id', getMessageToMessage);
// Добавить комментарий
router.post('/answer/:id', addMessageToMessage);

module.exports = router;
