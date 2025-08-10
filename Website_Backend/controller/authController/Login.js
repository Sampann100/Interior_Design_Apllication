const jwt = require("jsonwebtoken");
const loginModel = require("../../models/login");
const SignupModel = require("../../models/Signup");
const bcryptjs = require("bcryptjs");
const { default: transporter } = require("../../config/sendMailTransporter");

exports.loginPage = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const existingUser = await loginModel.findOne({ Email });
    if (existingUser) {
      const signupData = await SignupModel.findOne({ Email });

      const token = jwt.sign(
        { id: signupData._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      const mailOption = {
        from: process.env.SENDER_MAIL,
        to: Email,
        subject: `Welcome back, ${signupData.Username}!`,
        html: `<p>Hi <strong>${signupData.Username}</strong>,</p>
                  <p>It's great to see you! 🎉</p>
                  <p>We’re here to help if you need anything.</p>
              <br/>
              <p>– Security Team,<br/>MARC PRIDMORE INTERIOR</p>
      `,
      };

      await transporter.sendMail(mailOption);

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({
          success: true,
          message: "User already loggedIn.",
        });
    }

    const signupData = await SignupModel.findOne({ Email });

    if (!signupData) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcryptjs.compare(Password, signupData.Password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email or Password is invald!!" });
    }

    const userData = new loginModel({ Email, Password });
    await userData.save();

    const token = jwt.sign({ id: signupData._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const mailOption = {
      from: process.env.SENDER_MAIL,
      to: Email,
      subject: `Welcome, ${signupData.Username}!`,
      html: ` 
      <p>Hi <strong>${signupData.Username}</strong>,</p>
      <p>It's great to see you! 🎉</p>
      <p>We’re here to help if you need anything.</p>
      <br/>
      <p>– Security Team,<br/>MARC PRIDMORE INTERIOR</p>
      `,
    };

    await transporter.sendMail(mailOption);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        message: "Login successful!",
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};
