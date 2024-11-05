const signup_logic = require("../accessors/signup_logic");
const tokengenerator = require("../accessors/token_generator");

const signup = async (req, res, next) => {
  try {
    const user = await signup_logic(req.body);
    const token = tokengenerator(user._id);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = signup;
