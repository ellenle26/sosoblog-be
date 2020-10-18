const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sosoblog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", function () {
  console.log("MongoDB database connection established successfully!");
  // require("./testing/testSchema");
});

const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/blogs", blogsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

module.exports = app;
