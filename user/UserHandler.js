const connectToDatabase = require("../db"); //used to establish new or use existing database connections
const User = require("./User"); //used for model (mongoose)
require("dotenv").config({ path: "./variables.env" });

("use strict");

//used to get all the users
module.exports.getUsers = (event, context) => {
  return connectToDatabase() //return a promise
    .then(getUsers)
    .then((users) => ({
      statusCode: 200,
      body: JSON.stringify(users),
    }))
    .catch((err) => ({
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ message: err.message }),
    }));
};

//used to get all the users (helper funcition)
function getUsers() {
  return User.find({}) //should return a promise
    .then((users) => users)
    .catch((err) => Promise.reject(new Error(err)));
}
