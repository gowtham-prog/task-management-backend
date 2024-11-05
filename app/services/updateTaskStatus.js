const updateTaskStatus_logic = require("../accessors/updateTaskStatus_logic");

const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const newStatus = req.body.status;

  try {
    const updatedTask = await updateTaskStatus_logic(taskId, newStatus);
    res.status(200).json({
      message: "Task Status updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = updateTaskStatus;
