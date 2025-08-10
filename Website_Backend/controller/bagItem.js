const ItemCollection = require("../models/items");
const userProductData = require("../models/userProductData");

exports.getBagItem = async (req, res) => {
  try {
    const userId = req.userId;
    const bagItem = await userProductData
      .findOne({ userId })
      .populate("itemId");

    if (!bagItem || !Array.isArray(bagItem.itemId)) {
      return res.status(200).json([]);
    }

    const items = bagItem.itemId;

    return res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching bag items:", error);
    res.status(500).json({ message: "Failed to fetch bag items" });
  }
};
