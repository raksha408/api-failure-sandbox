const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
REGISTER USER
*/
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Create user
    user = await User.create({
      name,
      email,
      password: hashed
    });

    // ✅ Create token payload
    const payload = {
      id: user._id
    };

    // ✅ Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ token });

  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};


/*
LOGIN USER
*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // ✅ Create token payload
    const payload = {
      id: user._id
    };

    // ✅ Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ token });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};