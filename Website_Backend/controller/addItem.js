const ItemCollection = require("../models/items");

exports.getaddItems = async (req, res) => {
  try {
    const data = await ItemCollection.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postaddItems = async (req, res) => {
  try {
    const { itemName, imageUrl, description, original_price, current_price } =
      req.body;

    const newItem = new ItemCollection({
      itemName,
      imageUrl,
      description,
      original_price,
      current_price,
    });

    await newItem.save();
    res.status(200).json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
};

exports.postDeleteItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const deletedItem = await ItemCollection.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
