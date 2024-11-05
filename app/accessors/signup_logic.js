const User = require("../models/user.model"); // Adjust the path as necessary
// const bcrypt = require("bcrypt");

// Signup function to create a new user
const signup_logic = async (userData) => {
  try {
    // // Hash the password before saving
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    });

    // Save the user in the database
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};

module.exports = signup_logic;
