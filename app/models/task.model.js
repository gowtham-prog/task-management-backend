const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  name: {
    type: String,
    required: [true, "Task name is required"],
  },
  description: {
    type: String,
    required: [true, "Task description is required"],
  },
  details: {
    type: String,
  },
  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo",
    required: [true, "Task status is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Task", taskSchema);
