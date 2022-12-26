const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const { NOTFOUND_CODE } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '63873fc3c1986dc804c242da',
  };

  next();
});

app.use(express.json());

app.use('/cards', routerCards);
app.use('/users', routerUsers);
app.use('*', (req, res) => {
  res.status(NOTFOUND_CODE).send({
    message: 'Такой страницы не существует',
  });
});
app.post('/signin', login);
app.post('/signup', createUser);

mongoose.connect('mongodb://127.0.0.1/dbmestogha')
  .then(
    app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`);
    }),
  )
  .catch((err) => console.log(err));
