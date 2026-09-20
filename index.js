const natural = require("natural");
const express = require("express");

const app = express();

app.use(express.json());

const tokenizer = new natural.WordTokenizer();

app.get("/", (req, res) => {
  res.json({
    message: "GiftLink application is running",
    naturalLoaded: !!natural,
    tokenizerExample: tokenizer.tokenize("GiftLink application")
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`GiftLink server running on port ${PORT}`);
});
