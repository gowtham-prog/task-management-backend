const alltasks_logic = require("../accessors/allTasks_logic");

const allTasks = async (req, res) => {
  try {
    const tasks = await alltasks_logic();
    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = allTasks;
