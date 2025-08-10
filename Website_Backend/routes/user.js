const express = require("express");
const { signUpPage } = require("../controller/authController/SignUp");
const { loginPage } = require("../controller/authController/Login");
const { postItemComment } = require("../controller/itemComment");
const { getaddItems } = require("../controller/addItem");
const { getBagItem } = require("../controller/bagItem");
const { getUserPaymentDetail } = require("../controller/payment");
const { getOrderPlacedItems } = require("../controller/orderPlacedItem");

const userRouter = express.Router();

userRouter.get("/items", getaddItems);
userRouter.get("/cart", getBagItem);
userRouter.get("/userDetail", getUserPaymentDetail);
userRouter.get("/orderPlacedItem", getOrderPlacedItems);

//Comment
userRouter.post("/comment", postItemComment);

module.exports = userRouter;
