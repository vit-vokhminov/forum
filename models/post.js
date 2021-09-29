const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        author: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        messages: {
            type: Array,
        },
    },
    { timestamps: true }
);
// вторым аргументом конструктора можно передавать конфигурируемый объект
// timestamps это как раз date

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
