const Task = require("../models/task.model"); // Adjust the path as necessary

const updatetask_logic = async (taskId, updateData) => {
  try {
    // Find the task by ID and update it with the provided data
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Run schema validators on the updated data
    });

    // If the task was not found, throw an error
    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask; // Return the updated task
  } catch (err) {
    throw err; // Pass the error to the next level
  }
};

module.exports = updatetask_logic;
