const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const login_logic = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const { password: _, ...userData } = user.toObject();
    return userData;
  } catch (err) {
    throw err;
  }
};

module.exports = login_logic;
