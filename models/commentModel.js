const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, required: true, ref: "user" },
    blog: { type: mongoose.Schema.ObjectId, required: true, ref: "blog" },
    reactions: {
      laugh: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      like: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
