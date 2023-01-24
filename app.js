const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const router = require('./routes/allroutes');
const errorHandler = require('./errors/errorHandler');

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

app.use(express.json());

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/dbmestogha');

app.use(router);

app.use(errors());

app.use(errorHandler);

/*mongoose.connect('mongodb://127.0.0.1/dbmestogha')
  .then(
    app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`);
    }),
  )
  .catch((err) => console.log(err));*/
