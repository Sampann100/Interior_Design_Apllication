exports.logout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: '/'
    }).json({success: true, message: "Successfully logut!!"})
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
