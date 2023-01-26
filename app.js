const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const router = require('./routes/allroutes');
const errorHandler = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.use(errors());

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/dbmestogha')
  .then(app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
  }))
  .catch((err) => console.log(err));
