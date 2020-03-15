const express = require("express");
const routes = express.Router();

const checkUserExist = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "user name is required" });
  } else return next();
};
const checkUserInArray = (req, res, next) => {
  const user = users[req.params.index];
  req.user = user;

  if (!users[req.params.index]) {
    return res.status(400).json({ error: "user does not exist" });
  } else {
    req.user = user;
    return next();
  }
};

// CRUD = CREATE, READ , UPDATE , DELETE
const users = ["Renato", "Irailton", "Vinin"];

routes.use((req, res, next) => {
  console.log("a req foi chamada");
  console.log(req.method, req.url);
  return next(); // o
});

routes.get("/users/", (req, res) => {
  res.status(200).json(users);
});

routes.get("/users/:index", checkUserInArray, (req, res) => {
  res.status(200).json(`${req.user}`);
});

routes.post("/users/", checkUserExist, (req, res) => {
  const { name } = req.body;
  console.log(name);
  users.push(name);

  res.status(200).json(users);
});

routes.put("/users/:index", checkUserInArray, checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  res.status(200).json(users);
});

routes.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  res.status(200).send();
});

module.exports = routes;
