const ItemCollection = require("../models/items");
const userPaymentDetailModel = require("../models/userPaymentDetail");

exports.getOrderPlacedItems = async (req, res, next) => {
  const userId = req.userId;

  const orderItem = await userPaymentDetailModel.find({ userId });
  const orderItemId = orderItem
    .map((item) => item.payedItemId)
    .flat()
    .filter(Boolean);

  const orderPlacedItems = await ItemCollection.find({
    _id: { $in: orderItemId },
  });

  res.status(200).json({ success: true, orderPlacedItems });
};
