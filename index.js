const express = require("express");
const server = express();

// CRUD = CREATE, READ , UPDATE , DELETE
const users = ["Renato", "Irailton", "Vinin"];

server.use(express.json());

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

server.use((req, res, next) => {
  console.log("a req foi chamada");
  console.log(req.method, req.url);
  return next(); // o
});

server.get("/users/", (req, res) => {
  res.status(200).json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  res.status(200).json(`${req.user}`);
});

server.post("/users/", checkUserExist, (req, res) => {
  const { name } = req.body;
  console.log(name);
  users.push(name);

  res.status(200).json(users);
});

server.put("/users/:index", checkUserInArray, checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  res.status(200).json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  res.status(200).send();
});

server.listen(3002);
