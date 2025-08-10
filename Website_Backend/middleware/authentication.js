const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err);

    res.clearCookie("token");

    return res.status(401).json({ success: false, message: err });
  }
};