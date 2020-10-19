const User = require("../models/userModel");
const authController = {};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email", email, "pass", password);

    if (!email || !password) {
      throw new Error("You have no email or password");
    }
    const user = await User.loginWithEmail(email, password);
    const token = user.generateToken(user);

    res.status(200).json({
      status: "success",
      data: { user, token },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = authController;
