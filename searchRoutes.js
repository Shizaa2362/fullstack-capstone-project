const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { category } = req.query;

    const filter = category ? { category: category } : {};

    const items = await db
      .collection("gifts")
      .find(filter)
      .toArray();

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search gifts" });
  }
});

module.exports = router;
