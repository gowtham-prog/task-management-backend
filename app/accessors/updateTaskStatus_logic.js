const Task = require("../models/task.model");

const updateTaskStatus_logic = async (taskId, newStatus) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: newStatus },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (err) {
    throw err;
  }
};

module.exports = updateTaskStatus_logic;
