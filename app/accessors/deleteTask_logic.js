const Task = require("../models/task.model");

const deleteTask_logic = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw new Error("Task not found");
    }

    return deletedTask;
  } catch (err) {
    throw err;
  }
};

module.exports = deleteTask_logic;
