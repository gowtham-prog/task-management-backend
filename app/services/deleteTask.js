const deletetask_logic = require("../accessors/deleteTask_logic");

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await deletetask_logic(taskId);
    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = deleteTask;
