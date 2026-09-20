
const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

router.get("/api/gifts", async (req, res) => {
try {
const db = await connectToDatabase();
const gifts = await db.collection("gifts").find({}).toArray();
res.json(gifts);
} catch (error) {
console.error(error);
res.status(500).json({ error: "Failed to retrieve gifts" });
}
});

router.get("/api/gifts/:id", async (req, res) => {
try {
const db = await connectToDatabase();
const gift = await db.collection("gifts").findOne({
id: req.params.id
});

```
if (!gift) {
  return res.status(404).json({ error: "Gift not found" });
}

res.json(gift);
```

} catch (error) {
console.error(error);
res.status(500).json({ error: "Failed to retrieve gift" });
}
});

module.exports = router;
