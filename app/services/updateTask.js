const updateTask_logic = require("../accessors/updatetask_logic");

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updateData = req.body;

  try {
    const updatedTask = await updateTask_logic(taskId, updateData);
    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = updateTask;
