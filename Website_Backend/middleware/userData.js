const SignupModel = require("../models/Signup");

exports.userData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await SignupModel.findById(userId);

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "userData is not found!!" });

    return res.status(200).json({
      success: true,
      userData: {
        userId: user._id,
        Username: user.Username,
        Email: user.Email,
      },
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
