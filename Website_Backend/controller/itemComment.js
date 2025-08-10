const itemComment = require("../models/itemComment");

exports.postItemComment = async (req, res, next) => {
  const { itemId, comment } = req.body;
  const newComment = new itemComment({
    itemId,
    comment,
  });
  newComment
    .save()
    .then(() => res.status(200).json({ message: "Comment is saved!!" }))
    .catch((err) => console.log("Comment Error: ", err));
};
