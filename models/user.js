const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../errors/AllErrors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validator: {
      validator: (pic) => validator.isURL(pic),
      message: 'Неверный формат ссылки',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неверный формат e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new AuthError('ошшшипка');
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthError('неполуч');
        }
        return user;
      }));
};
module.exports = mongoose.model('user', userSchema);
