const exp = require("express");
const {
  createLecture
} = require("../Controllers/lecture.js");
const { isAuthenticated } = require("../MiddleWares/auth.js");

const app = exp.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);


app.post("/lecture", createLecture);


module.exports = app;
