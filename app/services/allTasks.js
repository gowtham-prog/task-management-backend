const alltasks_logic = require("../accessors/allTasks_logic");

const allTasks = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tasks = await alltasks_logic(token);
    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = allTasks;
