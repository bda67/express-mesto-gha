const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validationCreateUser, validationLogin } = require('../Validation');
const { NotFound } = require('../errors/AllErrors');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use((req, res, next) => {
  next(new NotFound('К сожалению, такой страницы не сущетсвует :('));
});

module.exports = router;
