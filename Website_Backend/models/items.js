const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  original_price: { type: Number, required: true },
  current_price: { type: Number, required: true },
});

const ItemCollection = mongoose.model(
  "ItemCollection",
  itemSchema,
  "Interior_Item"
);

module.exports = ItemCollection;
