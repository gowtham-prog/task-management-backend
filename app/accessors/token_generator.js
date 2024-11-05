const jwt = require("jsonwebtoken");
const secretKey = "1234";

const tokengenerator = (id) => {
  try {
    const token = jwt.sign({ userId: id }, secretKey, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

module.exports = tokengenerator;
