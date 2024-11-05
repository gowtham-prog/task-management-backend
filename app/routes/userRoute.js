const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer();

const signup = require("../services/signup");
const login = require("../services/login");
const validateLogin = require("../middlewares/validateLogin");
const validateSignup = require("../middlewares/validateSignup");
const validateToken = require("../middlewares/validateToken"); 


app.post("/signup", upload.none(),  validateSignup, signup);
app.post("/login", upload.none(), validateLogin, login);


// Token validation endpoint
app.post("/verify",upload.none(), validateToken, (req, res) => {
    return res.status(200).json({
        message: "Token is valid",
        user: req.user, // You can pass the decoded user info if you set it in validatetoken
    });
});


module.exports = app;
