const jwt = require("jsonwebtoken");
const secretKey = "1234"; // You should ideally store this in an environment variable

const validatetoken = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  try {
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token. Access denied." });
        } else {
          req.user = decoded; // Store the decoded token payload in req.user
          next();
        }
      });
    } else {
      // No token provided
      return res.status(401).json({ message: "No token provided. Access denied." });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Token verification failed. Access denied." });
  }
};

module.exports = validatetoken;
