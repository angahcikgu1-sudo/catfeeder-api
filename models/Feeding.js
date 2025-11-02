// models/Feeding.js
import mongoose from "mongoose";

const feedingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  time: { type: String, required: true }, // e.g. "08:00"
  days: [{ type: String }], // e.g. ["Mon", "Tue"]
  createdAt: { type: Date, default: Date.now }
});

const Feeding = mongoose.model("Feeding", feedingSchema);
export default Feeding;
