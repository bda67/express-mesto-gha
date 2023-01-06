const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const router = require('./routes/allroutes');
const errorHandler = require('./errors/errorHandler');

const app = express();

app.use(express.json());
app.use(router);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1/dbmestogha')
  .then(
    app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`);
    }),
  )
  .catch((err) => console.log(err));
