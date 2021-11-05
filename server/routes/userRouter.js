const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const validate = require('./validate');
const { check, validationResult } = require('express-validator');
//const { signIn, signUp } = require('../controllers/authController');

// регистрация
router.post(
    '/registration', validate.SignUp, userController.registration
);
// авторизация
router.post('/login', validate.SignIn, userController.login);
// выйти из аккаунта
router.post('/logout', userController.logout);
// автивация аккаунта по ссылке из высланного письма на почту
router.get('/activate/:link', userController.activate);
// перезавись access токен в случае окончания его срока годности
router.get('/refresh', userController.refresh);

module.exports = router;
