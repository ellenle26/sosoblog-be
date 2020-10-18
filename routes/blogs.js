const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogsController");

/* GET home page. */
router.get("/", blogsController.getBlogs);

module.exports = router;
