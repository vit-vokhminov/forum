const Router = require('express');
const router = new Router();
const { check, validationResult } = require('express-validator');
const { signIn, signUp } = require('../controllers/authController');

// Авторизация
router.post(
    '/signin',
    [
        check('email', 'Сам-то понял что написал?').isEmail(),
        check('password', 'Сам-то понял что написал?').isLength({ min: 6 }),
    ],
    signIn
);
// Регистрация
router.post('/signup', signUp);

module.exports = router;
