const routerUsers = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

const {
  validationUpdateAvatar,
  validationUpdateUserInfo,
  validationGetUserById,
} = require('../Validation');

routerUsers.get('/me', getUsers);
routerUsers.get('/:userId', validationGetUserById, getUserById);
routerUsers.patch('/me', validationUpdateUserInfo, updateUserInfo);
routerUsers.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = routerUsers;
