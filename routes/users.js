const routerUsers = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const { validationUpdateAvatar, validationUpdateUserInfo, validationGetUserById } = require('../Validation');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getUserInfo);
routerUsers.get('/:userId', validationGetUserById, getUserById);
routerUsers.patch('/me', validationUpdateUserInfo, updateUserInfo);
routerUsers.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = routerUsers;
