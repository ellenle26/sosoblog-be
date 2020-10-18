const User = require("../models/userModel");
const usersController = {};

usersController.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: users,
      message: `Found ${users.length} user(s)`,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = usersController;
