const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createTask_logic = async (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    data.user = userId;

    const task = await Task.create(data);
    return task;
  } catch (err) {
    throw err;
  }
};

module.exports = createTask_logic;
