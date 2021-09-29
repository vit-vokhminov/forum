const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').blue;

const app = express();

app.set('view engine', 'ejs');

//const PORT = 4000;
//const db = 'mongodb+srv://vit-vokhminov:Nfhrjcfkt17@cluster0.fijxw.mongodb.net/data_webdev?retryWrites=true&w=majority';

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log(successMsg('Установленно соединение с mongoDB')))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Слушаю порт ${process.env.PORT}`));
});

app.use(express.urlencoded({ extended: false }));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Домашняя';
  res.render(createPath('index'), { title });
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);


app.use((req, res) => {
  const title = 'Error Page';
  res.status(404).render(createPath('error'), { title });
});
