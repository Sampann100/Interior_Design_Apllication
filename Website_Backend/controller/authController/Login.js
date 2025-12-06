const jwt = require("jsonwebtoken");
const SignupModel = require("../../models/Signup");
const bcryptjs = require("bcryptjs");
const { sendMail } = require("../../config/sendMailTransporter");

exports.loginPage = async (req, res) => {
  try {
    // Expecting: { Email, Password }
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required!",
      });
    }

    // Search user by Email in Signup database
    const user = await SignupModel.findOne({ Email: Email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    // Compare password using bcrypt
    const isMatch = await bcryptjs.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or Password is invalid!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send welcome mail
    await sendMail({
      to: Email,
      subject: `Welcome back, ${user.Username}!`,
      html: `
        <p>Hi <strong>${user.Username}</strong>,</p>
        <p>Welcome back! 🎉</p>
        <p>We’re here to help if you need anything.</p>
        <br/>
        <p>– Security Team,<br/>MARC PRIDMORE INTERIOR</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      user: {
        id: user._id,
        username: user.Username,
        Email: user.Email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};
