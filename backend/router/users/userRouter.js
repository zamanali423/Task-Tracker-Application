const express = require("express");
const router = express.Router();
const User = require("../../database/userDatabase/users");
const bcrypt = require("bcryptjs");
const generateToken = require("../../authentication/generateToken");
const authenticate = require("../../authMiddleware/authenticate");
const { registerSchema, loginSchema } = require("../../validation/validation");
const validate = require("../../validation/validateMiddleware");

router.get("/users", (req, res) => {
  res.send("get user here");
});

//! Register User
router.post(
  "/users/register/newUser",
  validate(registerSchema),
  async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ msg: "Email Already Registered" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({
        fullName,
        email,
        password: hashPassword,
      });

      await user.save();

      const token = generateToken(user);
      return res
        .status(201)
        .json({ msg: "Register Successfully", user, token });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ msg: "Internal Server Error", error });
    }
  }
);

//! Login User
router.post("/users/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Email or password is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password do not match" });
    }
    const token = generateToken(user);
    return res.status(200).json({ msg: "Login Successfully", user, token });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

//! get user
router.get("/users/getUser", authenticate, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ msg: "User not find" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

module.exports = router;
