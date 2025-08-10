const mongoose = require("mongoose");

const paymentDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SignupModel",
    required: true,
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
  razorpay_signature: { type: String, required: true },
  paymentStatus: { type: Boolean, required: true },
  createAt: { type: Date, default: Date.now, required: true },
  payedItemId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProductData",
      require: true,
    },
  ],
});

const userPaymentDetailModel = mongoose.model(
  "userPaymentDetail",
  paymentDetailSchema,
  "userPaymentDetails"
);

module.exports = userPaymentDetailModel;
