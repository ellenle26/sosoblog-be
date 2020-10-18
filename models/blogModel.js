const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [],
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

blogSchema.plugin(require("./plugins/isDeletedFalse"));

blogSchema.virtual("reactions", {
  ref: "Reaction",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

blogSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "targetId",
  justOne: false,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
