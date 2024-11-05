const login_logic = require("../accessors/login_logic");
const tokengenerator = require("../accessors/token_generator");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login_logic(email, password);
    const token = tokengenerator(user._id);
    res.status(200).json({
      message: "Login successful",
      token: token,
      user,
    });
  } catch (err) {
    // Send a response with a 401 status code for authentication errors
    res.status(401).json({ error: err.message });
  }
};

module.exports = login;
