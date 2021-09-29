const express = require('express');
const {
  getPosts,
  addPost,
  getPost,
  deletePost,
  editPost,
  addMessages,
} = require('../controllers/api-post-controller');

const router = express.Router();

// Получить все посты
router.get('/api/posts', getPosts);
// Создать новый пост
router.post('/api/post/', addPost);
// Получить пост по id
router.get('/api/post/:id', getPost);
// Удалить пост по id
router.delete('/api/post/:id', deletePost);
// Изменить пост по id
router.put('/api/post/:id', editPost);
// Добавить комментарий
router.post('/api/message/:id', addMessages);

module.exports = router;
