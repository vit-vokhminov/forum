const { check, validationResult } = require('express-validator');

const validate = {
    SignUp: [
        check('email', 'Сам-то понял что написал?').isEmail(),
        check('password', 'Сам-то понял что написал?').isLength({
            min: 3,
            max: 32,
        }),
    ],
    SignIn: [
        check('email', 'Сам-то понял что написал?').isEmail(),
        check('password', 'Сам-то понял что написал?').isLength({
            min: 3,
            max: 32,
        }),
    ],
    activateEmail: [
        
    ]
};

module.exports = validate;
