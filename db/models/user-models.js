const db = require("../db-config");

function getUsers() {
  return db("users");
}

function register(data) {
  return db("users").insert(data);
}

function login(username) {
  return db("users").where(username);
}

module.exports = {
  getUsers,
  register,
  login
};
