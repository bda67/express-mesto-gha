const routerUsers = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.patch('/me', updateUserInfo);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
