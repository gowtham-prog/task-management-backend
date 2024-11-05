const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

const validatetoken = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  try {
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Invalid token. Access denied." });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      return res
        .status(401)
        .json({ message: "No token provided. Access denied." });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ message: "Token verification failed. Access denied." });
  }
};

module.exports = validatetoken;
