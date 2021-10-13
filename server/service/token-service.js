const jwt = require('jsonwebtoken');
const { TokenModel } = require('../models/models');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'})
        return {
            accessToken,
            refreshToken
        }
    }

    // валидирум токен на то что токен не подделан и срок годности не ссяк
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
    // валидирум токен на то что токен не подделан и срок годности не ссяк
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(login, refreshToken) {
        //! подумать как сделать авторизацию на другом устройстве
        const tokenData = await TokenModel.findOne({ where: { login: login } })
        if (tokenData) {
            // перезаписываем refreshToken в БД
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        // если пользователь логинится в первый раз
        const token = await TokenModel.create({login: login, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.destroy({where: {refreshToken: refreshToken}})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ where: {refreshToken: refreshToken}})
        return tokenData;
    }
}

module.exports = new TokenService();
