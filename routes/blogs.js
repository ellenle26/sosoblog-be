const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogsController");

/* GET home page. */
router.get("/", blogsController.getBlogs);
router.get("/:id", blogsController.getSingleBlog);

module.exports = router;
