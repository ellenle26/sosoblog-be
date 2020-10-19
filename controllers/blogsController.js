const Blog = require("../models/blogModel");
const blogsController = {};

blogsController.getBlogs = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalBlogs = await Blog.countDocuments({
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalBlogs / limit);
    const offset = limit * (page - 1);

    // console.log({ filter, sortBy });
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author");

    res.status(200).json({
      status: "success",
      data: { blogs, totalPages },
      message: `Found ${blogs.length} blog(s)`,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

blogsController.getSingleBlog = async (req, res) => {
  try {
    const singleBlog = await Blog.findById(req.params.id).populate("user");
    res.status(200).json({
      status: "success",
      data: singleBlog,
      message: `Found blog ${singleBlog._id}`,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = blogsController;
