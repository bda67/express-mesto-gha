const routerUsers = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
} = require("../controllers/users");

routerCards.get("/", getUsers);
routerCards.get("/:userId", getUserById);
routerCards.post("/:", createUser);
routerCards.patch("/me", updateUserInfo);
routerCards.patch("/me/avatar", updateAvatar);

module.exports = routerUsers;
