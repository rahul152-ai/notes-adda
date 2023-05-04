const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

// registeratin endpoint
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    // res.status(400);
    return res
      .status(400)
      .json(
        "User already exits with this email address try different address!"
      );
  }

  // Hash the password before saving it to the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    return res.json({ status: "sucess", message: "user created sucessfylly" });
  }
  return res.json({
    status: "error",
    message: "server error sorry for inconvience!",
  });
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      status: "error",
      message: "User not found! Create Account",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      status: "error",
      message: "Passwoard not match! Enter correct Passwoard",
    });
  }

  // Create and sign JWT token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
});

module.exports = router;
