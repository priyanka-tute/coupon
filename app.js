// var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

require("./services/mongoose");
require("./services/mysql");



var app = express();
app.use(cors());

// view engine setup
// app.set(path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(require("./routers/coupon"));
// app.use(
//   express.json({
//     type: ["application/json", "text/plain"],
//   })
// );
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));





module.exports = app;
