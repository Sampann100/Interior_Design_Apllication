const express = require("express");
const { signUpPage } = require("../controller/authController/SignUp");
const { loginPage } = require("../controller/authController/Login");
const { getaddItems } = require("../controller/addItem");
const { logout } = require("../controller/authController/Logout");
const { userData } = require("../middleware/userData");
const { authentication } = require("../middleware/authentication");

const authRouter = express.Router();

authRouter.post("/signup", signUpPage);
authRouter.post("/login", loginPage);
authRouter.post("/logout", logout);

authRouter.get("/", authentication, userData);

authRouter.get("/items", getaddItems);

module.exports = authRouter;
