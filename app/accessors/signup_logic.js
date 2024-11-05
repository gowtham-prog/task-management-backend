const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const signup_logic = async (userData) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};

module.exports = signup_logic;
