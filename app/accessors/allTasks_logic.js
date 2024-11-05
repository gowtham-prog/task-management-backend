const Task = require("../models/task.model"); // Adjust the path as necessary

const allTasks_logic = async () => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find()
      .populate("user", "firstName lastName email") // Populate user details if needed
      .exec(); // Execute the query

    return tasks; // Return the retrieved tasks
  } catch (err) {
    throw err; // Pass the error to the next level
  }
};

module.exports = allTasks_logic;
