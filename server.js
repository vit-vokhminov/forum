require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
//const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', router);
//app.use(errorHandler);

io.on('connection', (socket) => {
    // console.log('К СОКЕТАМ ПОДКЛЮЧИЛИСЬ!', socket.id);

    socket.on('NEW_MESSAGE', () => {
        socket.broadcast.emit('NEW_MESSAGE');
    });

    socket.on('DELETE_POST', () => {
        io.emit('DELETE_POST');
    });

    socket.on('ADD_POST', () => {
        socket.broadcast.emit('ADD_POST');
    });
});

const start = async () => {
    try {
        await sequelize.authenticate(); // устанавливаем подключение к БД
        await sequelize.sync(); // сверяет данные БД со схемой
        http.listen(PORT, () =>
            console.log(`Сервер запущен на порту ${PORT}`)
        );
    } catch (e) {
        console.log(e);
    }
};

start();
