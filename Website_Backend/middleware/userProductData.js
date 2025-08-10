const userProductData = require("../models/userProductData");

exports.postUserProductData = async (req, res, next) => {
  const { itemId } = req.body;
  const userId = req.userId;

  try {
    if (!itemId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await userProductData.findOneAndUpdate(
      { userId },
      { $addToSet: { itemId } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Item added to bag successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

exports.postUserProductDataItemDelete = async (req, res, next) => {
  const { itemId } = req.body;
  const userId = req.userId;

  try {
    if (!userId || !itemId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await userProductData.findOneAndUpdate(
      { userId },
      { $pull: { itemId } },
      { new: true }
    );

    res.status(200).json({ message: "Item removed from bag successfully" });
  } catch (err) {
    console.log(err.message);
  }
};
