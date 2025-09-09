const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==================== REGISTER ====================
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body || {};

    // validate fields
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please provide username, email, and password" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ==================== LOGIN ====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // validate fields
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // check JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: "JWT secret not defined in environment variables" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
