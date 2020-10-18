const Blog = require("../models/blogModel");
const blogsController = {};

blogsController.getBlogs = async (req, res, next) => {
  try {
    const bloglist = await Blog.find();
    res.status(200).json({
      status: "success",
      data: bloglist,
      message: "Sucessfully get all the blogs",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = blogsController;
