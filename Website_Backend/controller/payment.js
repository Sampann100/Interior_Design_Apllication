const { createRazorpayInstance } = require("../config/razorpay.config");
const { nanoid } = require("nanoid");
const crypto = require("crypto");
const userPaymentDetailModel = require("../models/userPaymentDetail.js");
const userProductData = require("../models/userProductData.js");

const razorpayInstance = createRazorpayInstance();

exports.createOrder = (req, res, next) => {
  //amount client say nhi lena chahiyai
  const { courseId, amount } = req.body;

  if (!courseId || !amount)
    return res
      .status(400)
      .json({ success: false, message: "Something is missing." });

  const option = {
    amount: amount * 100,
    currency: "INR",
    receipt: nanoid(),
  };

  try {
    razorpayInstance.orders.create(option, (err, order) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyPayment = (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } else
    return res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
};

exports.savePaymentInfo = async (req, res, next) => {
  const userId = req.userId;
  const {
    fullName,
    email,
    phoneNumber,
    address,
    amount,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paymentStatus,
  } = req.body;

  try {
    const userProducts = await userProductData.find({ userId });
    const payedItemId = userProducts.map((items) => items.itemId).flat();

    const userPaymentDetail = new userPaymentDetailModel({
      userId,
      fullName,
      email,
      phoneNumber,
      address,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentStatus,
      payedItemId,
    });

    userPaymentDetail.save();

    await userProductData.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "User Payment Detail saved successfully",
    });
  } catch (err) {
    console.log("Error in saving payment info", err);
  }
};

exports.getUserPaymentDetail = async (req, res, next) => {
  const userId = req.userId;
  try {
    const userPaymentDetail = await userPaymentDetailModel
      .findOne({ userId })
      .sort({ createAt: -1 });

    res.json(userPaymentDetail);
  } catch (err) {
    console.log("Error in getting payment info", err);
  }
};
