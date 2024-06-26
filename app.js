const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const mongodb = process.env.db;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodb);
}

const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const allowList = process.env.allowList;
const corsOptionsFunc = function (req, callback) {
  if (allowList.indexOf(req.header("Origin")) !== -1) {
    //check
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsFunc));

app.use(cors());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
