const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const allTasks_logic = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) {
      throw new Error("User ID not found in token");
    }
    const userId = decoded.userId;
    const tasks = await Task.find({ user: userId })
      .populate("user", "firstName lastName email")
      .exec();

    return tasks;
  } catch (err) {
    throw err;
  }
};

module.exports = allTasks_logic;
