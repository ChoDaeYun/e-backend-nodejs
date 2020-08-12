var express = require("express");
var userRouter = require("./user");
var signRouter = require("./sign");
var categoryRouter = require("./catagory");

var app = express();
app.use("/user/", userRouter);
app.use("/sign/", signRouter);
app.use("/category/", categoryRouter);

module.exports = app;
