const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
const routerCards = require("./routes");
const routerUsers = require("./routes");

const app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());

app.use("/cards", routerCards);
app.use("/users", routerUsers);

app.use((req, res, next) => {
  req.user = {
    _id: "ID из compass", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
