const Task = require("../models/task.model");

const allTasks_logic = async () => {
  try {
    const tasks = await Task.find()
      .populate("user", "firstName lastName email")
      .exec();

    return tasks;
  } catch (err) {
    throw err;
  }
};

module.exports = allTasks_logic;
