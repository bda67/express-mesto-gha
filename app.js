const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const routerCards = require('./routes/cards');
const { routerUsers } = require('./routes/users');

const app = express();
app.use(
  bodyParser.urlencoded({ extended: true }),
);

app.use((req, res, next) => {
  req.user = {
    _id: '63873fc3c1986dc804c242da',
  };

  next();
});

app.use(bodyParser.json());

app.use('/cards', routerCards);
app.use('/users', routerUsers);
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Такой страницы не существует',
  });
});

mongoose.connect(
  'mongodb://127.0.0.1/dbmestogha',
  {
    useNewUrlParser: true,
  },
  () => {
    app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`);
    });
  },
);
