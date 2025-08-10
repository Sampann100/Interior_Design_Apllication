const mongoose = require("mongoose");

const itemCommentSchema = new mongoose.Schema({
  itemId: { type: String, require: true },
  comment: { type: String, require: true },
});

module.exports = mongoose.model(
  "ItemComment",
  itemCommentSchema,
  "itemComments"
);
