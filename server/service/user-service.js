const { UserModel } = require('../models/models');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, login, phone, password) {
        const candidate = await UserModel.findOne({ where: { email: email } })
        // проверка на существование такого пользователя
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким почтовым адресом уже существует`)
        }
        const candidateLogin = await UserModel.findOne({ where: { login: login } });
        if (candidateLogin) {
            throw ApiError.BadRequest(`Пользователь с таким именем уже существует`)
        }

        // хешируем пароль
        const hashPassword = await bcrypt.hash(password, 12);
        // ссылка для активации
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf
        // сохраняем пользователя в БД
        const user = await UserModel.create({email, login, phone, password: hashPassword, activationLink})

        // отправляем на почту письмо со ссылкой на активадию
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        // UserDto нужен чтобы викинуть из модели ненужные поля
        const userDto = new UserDto(user); // останется id, email, isActivated
        // генерируем токены access и refresh
        const tokens = tokenService.generateTokens({...userDto});
        // сохраняем refresh токен в БД
        await tokenService.saveToken(userDto.login, tokens.refreshToken);

        return {...tokens, user: userDto}

        /*
            return {
                "accessToken": "eyJhbGciOkpXVCJ9.eyJlbWFpbjY0Mn0.l4coLiHveaQM",
                "refreshToken": "eyJhbGciOkpXVCJ9.eyJlbWFpbjY0Mn0.l4coLiHveaQM",
                "user": {
                    "email": "vit@mail.com",
                    "login": "vit",
                    "isActivated": false
                }
            }
        */
    }

    async activate(activationLink) {
        // перехватывается ссылка пришедшая на почту для активации
        // http://localhost:5000/api/activate/fc8206e2-745a-4af2-8549-d56392b12fca
        // activationLink fc8206e2-745a-4af2-8549-d56392b12fca
        const user = await UserModel.findOne({ where: {activationLink}})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ where: {email}})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        // сохраняем refreshToken в БД
        await tokenService.saveToken(userDto.login, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        // валидируем-проверяем наличие-подлинность токена
        const userData = tokenService.validateRefreshToken(refreshToken);
        // проверяем наличие токена в БД
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findOne({ where: {login: userData.login}});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.login, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

}

module.exports = new UserService();
