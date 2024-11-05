const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer();

const signup = require("../services/signup");
const login = require("../services/login");
const validateLogin = require("../middlewares/validateLogin");
const validateSignup = require("../middlewares/validateSignup");
const validateToken = require("../middlewares/validateToken");
const verify = require("../services/verify");

app.post("/signup", upload.none(), validateSignup, signup);
app.post("/login", upload.none(), validateLogin, login);
app.post("/verify", upload.none(), validateToken, verify);

module.exports = app;
