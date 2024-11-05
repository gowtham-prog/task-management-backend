const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");

const createTask_logic = async (token, data) => {
  try {
    // Decode the token to get user information
    const decoded = jwt.verify(token, "1234"); // Replace with your actual secret key

    // Extract user ID from the decoded token
    const userId = decoded.userId; // Assuming the token payload contains the user's ID as 'id'

    data.user = userId;

    const task = await Task.create(data);
    return task;
  } catch (err) {
    throw err;
  }
};

module.exports = createTask_logic;
