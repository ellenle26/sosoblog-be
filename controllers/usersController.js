const User = require("../models/userModel");
const usersController = {};
const bcrypt = require("bcrypt");

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

usersController.createUser = async (req, res) => {
  try {
    let { name, email, password, avatarUrl } = req.body;
    if (await User.findOne({ email: email })) {
      throw new Error("Account already existed");
    }
    const user = new User({ name, email, password, avatarUrl });
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
      message: `User ${user.name} created`,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = usersController;
