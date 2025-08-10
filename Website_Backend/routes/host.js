const express = require("express");
const {
  personalContactDetail,
} = require("../controller/personalContactDetail");
const { chatbot } = require("../controller/chatbot");
const { postaddItems, postDeleteItem } = require("../controller/addItem");
const {
  postUserProductData,
  postUserProductDataItemDelete,
} = require("../middleware/userProductData");
const { createOrder, verifyPayment, savePaymentInfo } = require("../controller/payment");

const hostRouter = express.Router();

hostRouter.post("/personalContactDetail", personalContactDetail);
hostRouter.post("/chatbot", chatbot);

hostRouter.post("/items", postaddItems);

hostRouter.post("/cart", postUserProductData);

hostRouter.post("/deleteCartItem", postUserProductDataItemDelete);

hostRouter.post("/itemDelete", postDeleteItem);

//Payment API
hostRouter.post("/createOrder", createOrder);
hostRouter.post("/verifyPayment", verifyPayment);
hostRouter.post("/savePaymentInfo", savePaymentInfo);

module.exports = hostRouter;
