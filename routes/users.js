const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/* GET users listing. */
router.get("/", usersController.getUser);
router.post("/register", usersController.createUser);

module.exports = router;
