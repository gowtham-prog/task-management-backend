const Task = require("../models/task.model"); // Adjust the path as necessary

const deleteTask_logic = async (taskId) => {
  try {
    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // If the task was not found, throw an error
    if (!deletedTask) {
      throw new Error("Task not found");
    }

    return deletedTask; // Return the deleted task document
  } catch (err) {
    throw err; // Pass the error to the next level
  }
};

module.exports = deleteTask_logic;
