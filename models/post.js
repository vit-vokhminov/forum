// описываем схему поста
// const post = {
//   id: '1',       не описываем тк его не передаём, оно создаётся автоматически
//   text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
//   title: 'Мой пост',
//   date: '05.05.2021',
//   author: 'vit-vokhminov',
// };

const mongoose = require('mongoose');
// вытягиваю из mongoose конструктор Schema
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    required: true,   // свойство обязательное для заполнения
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
}, { timestamps: true });
// вторым аргументов конструктор можно передавать конфигурируемый объект
// timestamps это как раз date

// применяем схему к модели
// 'Post' это имя модеди, postSchema наша схема
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
