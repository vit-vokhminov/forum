const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { Auth } = require('../models/models');

const handleError = (res, error) => {
    res.status(500).send('ERROR: ', error.message);
};

const signIn = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректный данные при авторизации',
            });
        }

        const { email, password } = req.body;

        const user = await Auth.findOne({ where: { email: email } });
        if (!user) {
            return handleError(res, { message: 'Пользователь не найден' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return handleError(res, {
                message: 'Неверный пароль, попробуйте снова',
            });
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, userId: user.id });
    } catch (error) {
        handleError(res, error);
    }
};

const signUp = async (req, res) => {
    const { email, login, phone, password } = req.body;

    const candidateEmail = await Auth.findOne({ where: { email: email } });
    if (candidateEmail) {
        return handleError(res, {
            message: 'Такой пользователь уже существует',
        });
    }
    const candidateLogin = await Auth.findOne({ where: { login: login } });
    if (candidateLogin) {
        return handleError(res, {
            message: 'Пользователь с таким именем уже существует',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    Auth.create({ email, login, phone, password: hashedPassword })
        .then((user) => res.status(200).json(user))
        .catch((error) => handleError(res, error));
};

module.exports = {
    signIn,
    signUp,
};
