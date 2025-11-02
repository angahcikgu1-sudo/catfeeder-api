// routes/feedingRoutes.js
import express from "express";
import Feeding from "../models/Feeding.js";

const router = express.Router();

// Add feeding time
router.post("/add", async (req, res) => {
  try {
    const { userId, time, days } = req.body;
    if (!userId || !time) return res.status(400).json({ message: "Missing userId or time" });

    const f = new Feeding({ user: userId, time, days: days || [] });
    await f.save();
    res.status(201).json({ message: "Feeding added", feeding: f });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get feedings for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const feedings = await Feeding.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(feedings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a feeding (optional)
router.delete("/:id", async (req, res) => {
  try {
    await Feeding.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
