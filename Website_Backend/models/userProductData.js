const mongoose = require("mongoose");

const userProductDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SignupModel",
    required: true,
  },
  itemId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemCollection",
      required: true,
    },
  ],
  addedAt: { type: Date, default: Date.now },
});

const userProductData = mongoose.model(
  "UserProductData",
  userProductDataSchema
);

module.exports = userProductData;
