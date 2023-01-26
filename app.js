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

mongoose.connect('mongodb://localhost:27017/dbmestogha');

app.use('/', router);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
