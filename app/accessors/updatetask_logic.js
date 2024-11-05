const Task = require("../models/task.model");

const updateTask_logic = async (taskId, updateData) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (err) {
    throw err;
  }
};

module.exports = updateTask_logic;
