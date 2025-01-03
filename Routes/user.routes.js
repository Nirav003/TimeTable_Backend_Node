const exp = require("express");
const {
  login,
  logout,
  newUser,
  profile,
} = require("../Controllers/user.controller.js");
const { isAuthenticated } = require("../MiddleWares/auth.js");
const { verifyRole } = require("../MiddleWares/verifyRole.js");

const app = exp.Router();

app.post("/login", login);

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/register", verifyRole(['admin']), newUser);
app.get("/profile", profile);
app.get("/logout", logout);


module.exports = app;
