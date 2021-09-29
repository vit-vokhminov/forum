const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');

app.use(postApiRoutes);
app.use(contactRoutes);

async function start() {
    try {
        await mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((res) => console.log('Установленно соединение с mongoDB'))
            .catch((error) => console.log(error));

        app.listen(process.env.PORT, (error) => {
            error
                ? console.log(error)
                : console.log(`Слушаю порт ${process.env.PORT}`);
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
