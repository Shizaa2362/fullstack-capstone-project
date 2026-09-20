const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectToDatabase } = require("./db");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "giftlink-secret-key";

// Login API
router.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const db = await connectToDatabase();

    // Locate the current user in the database
    const user = await db.collection("users").findOne({ username: username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      { username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed"
    });
  }
});

// Registration API
router.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const db = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({
      username: username
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      username: username,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed"
    });
  }
});

// Update user API
router.put("/api/users/:username", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const user = await db.collection("users").findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const updateData = {};

    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    await db.collection("users").updateOne(
      { username: req.params.username },
      { $set: updateData }
    );

    res.json({
      message: "User updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "User update failed"
    });
  }
});

module.exports = router;
