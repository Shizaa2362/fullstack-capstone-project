
const express = require("express");
const cors = require("cors");

const giftRoutes = require("./giftRoutes");
const searchRoutes = require("./searchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(giftRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
  res.send("GiftLink API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
