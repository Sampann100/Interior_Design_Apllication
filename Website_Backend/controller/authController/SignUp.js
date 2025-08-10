const SignupModel = require("../../models/Signup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUpPage = async (req, res, next) => {
  try {
    const { Username, Email, Password } = req.body;
    if (!Username || !Email || !Password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const existingUser = await SignupModel.findOne({ Email });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: true, message: "User already exists!" });
    }

    bcrypt.hash(Password, 12).then(async (hashedPassword) => {
      const signupDetails = new SignupModel({
        Username,
        Email,
        Password: hashedPassword,
      });

      await signupDetails.save();

      return res.status(201).json({
        success: true,
        message: "Signup successful! Please log in.",
      });
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
