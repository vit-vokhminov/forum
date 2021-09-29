const Post = require('../models/post');
const Messages = require('../models/messages');

const handleError = (res, error) => {
    res.status(500).send(error.message);
};

const getPosts = (req, res) => {
    Post.find()
        .sort({ createdAt: -1 })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => handleError(res, error));
};

const addPost = (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text });
    post.save()
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

const getPost = (req, res) => {
    Post.findById(req.params.id)
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
    const { title, author, text } = req.body;
    const { id } = req.params;
    Post.findByIdAndUpdate(id, { title, author, text }, { new: true }) // вернёт обновлённые данные
        .then((post) => res.json(post))
        .catch((error) => handleError(res, error));
};

const deletePost = (req, res) => {
    const { id } = req.params;
    Post.findByIdAndDelete(id)
        .then((post) => res.status(200).json(id))
        .catch((error) => handleError(res, error));
};

const addMessages = (req, res) => {
    const { author, text } = req.body;
    const { id } = req.params;

    const mess = new Messages({ author, text });
    // ! почему то через схему даты не создаются
    mess['createdAt'] = new Date();
    mess['updatedAt'] = new Date();

    Post.updateOne(
        { _id: id },
        {
            $push: {
                messages: mess,
            },
        }
    )
        .then((mess) => res.status(200).json(mess))
        .catch((error) => handleError(res, error));
};

module.exports = {
    getPosts,
    addPost,
    getPost,
    editPost,
    deletePost,
    addMessages,
};
