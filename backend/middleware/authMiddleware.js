const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ❌ No token
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Extract token (Bearer <token>)
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX: set user object correctly
    req.user = {
      id: decoded.id
    };

    next();

  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};