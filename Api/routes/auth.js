const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({
      message:
        "Unauthorized frist create a account and login then you can view notes",
    });
  }
}

module.exports = auth;
