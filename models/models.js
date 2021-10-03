const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Auth = sequelize.define('auth', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
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

Post.hasMany(Message, {
    sourceKey: 'id',
});
Message.belongsTo(Post);

Message.hasMany(Message, { as: 'children', foreignKey: 'messageId' });
Message.belongsTo(Message, { as: 'parent', foreignKey: 'messageId' });

module.exports = {
    Post,
    Message,
    Auth,
};
