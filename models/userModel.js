const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltrounds = 10;
const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String, require: false, default: "" },
    password: { type: String, required: true, select: false },
    emailVerificationCode: { type: String, select: false },
    emailVerified: { type: Boolean, require: true, default: false },
    friendCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

userSchema.plugin(require("./plugins/isDeletedFalse"));
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, saltrounds);
  next();
});

userSchema.statics.loginWithEmail = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!email) {
    throw new Error("we don't have that user");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("password is not match");
  }

  return user;
};

userSchema.methods.generateToken = function () {
  //no arrow function allowed
  const user = this;

  const token = jwt.sign({ id: user._id }, process.env.KEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
