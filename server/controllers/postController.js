const { Post } = require('../models/models');

const handleError = (res, error) => {
    res.status(500).send('ERROR: ',error.message);
};

const getPosts = (req, res) => {
    Post.findAll()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => handleError(res, error));
};

const addPost = (req, res) => {
    const { title, author, text } = req.body;
    Post.create({ author, title, text })
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

const getPost = (req, res) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
    const { title, author, text } = req.body;
    const { id } = req.params;
    Post.update({ title, author, text }, { where: { id: id } })
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

const deletePost = (req, res) => {
    const { id } = req.params;
    Post.destroy({ where: { id: id } })
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};

module.exports = {
    getPosts,
    addPost,
    getPost,
    editPost,
    deletePost
};
