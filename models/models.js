const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const UserModel = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING },
});

const TokenModel = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
});

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, defaultValue: '' },
});

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, defaultValue: '' },
});

UserModel.hasMany(TokenModel, {
    sourceKey: 'id',
});
TokenModel.belongsTo(UserModel);

Post.hasMany(Message, {
    sourceKey: 'id',
});
Message.belongsTo(Post);

Message.hasMany(Message, { as: 'children', foreignKey: 'messageId' });
Message.belongsTo(Message, { as: 'parent', foreignKey: 'messageId' });

module.exports = {
    UserModel,
    TokenModel,
    Post,
    Message
};
