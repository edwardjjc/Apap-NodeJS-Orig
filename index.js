var express = require("express");
var userRouter = require("./Controller/userRouter.js");
var user = require("./Models/user.js");

var app = express();
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static("Resources"))
app.use("/TareasApap", userRouter);
app.use("/", userRouter);

app.listen(8020);