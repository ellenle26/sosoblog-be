const mongoose = require("mongoose");

const reactionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    targetType: { type: String, required: true, enum: ["Blog", "Review"] },
    targetId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "targetType",
    },
    emoji: {
      type: String,
      required: true,
      enum: ["laugh", "sad", "like", "love", "angry"],
    },
  },
  { timestamps: true }
);

const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;
