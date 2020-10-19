const User = require("../models/userModel");
const authController = {};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("You have no email or password");
    }
    const user2 = await User.loginWithEmail(email, password);
    const token = user2.generateToken(user2);

    res.status(200).json({
      status: "success",
      data: { user2, token },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = authController;
