const Router = require('express');
const router = new Router();
const {
    getPosts,
    addPost,
    getPost,
    deletePost,
    editPost
} = require('../controllers/postController');

// Получить все посты
router.get('/posts', getPosts);
// Создать новый пост
router.post('/post', addPost);
// Получить пост по id
router.get('/post/:id', getPost);
// Изменить пост по id
router.put('/post/:id', editPost);
// Удалить пост по id
router.delete('/post/:id', deletePost);

module.exports = router;
