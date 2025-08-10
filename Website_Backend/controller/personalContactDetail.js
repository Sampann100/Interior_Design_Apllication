const PersonalContactDetailModel = require("../models/PersonalContactDetail");

exports.personalContactDetail = async (req, res) => {
  try {
    const newContact = new PersonalContactDetailModel(req.body);

    await newContact.save();
    return res
      .status(200)
      .json({ message: "Contact details saved successfully!" });
  } catch (error) {
    console.error("Error saving contact details:", error);
    return res.status(500).json({ message: "Database error occurred." });
  }
};