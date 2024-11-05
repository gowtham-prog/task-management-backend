const alltasks_logic = require("../accessors/allTasks_logic"); // Adjust the path as necessary

const allTasks = async (req, res) => {
  try {
    const tasks = await alltasks_logic();
    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Internal Server Error
  }
};

module.exports = allTasks;
