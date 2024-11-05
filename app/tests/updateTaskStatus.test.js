const Task = require("../models/task.model");
const updateTaskStatus_logic = require("../accessors/updateTaskStatus_logic");

jest.mock("../models/task.model");

describe("updateTaskStatus_logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return the task when a valid taskId and newStatus are provided", async () => {
    const taskId = "12345";
    const newStatus = "inprogress";

    const mockUpdatedTask = {
      _id: taskId,
      name: "Sample Task",
      description: "Sample Description",
      status: newStatus,
      user: "user1",
      createdAt: new Date(),
      dueDate: new Date("2024-11-30"),
    };

    Task.findByIdAndUpdate.mockResolvedValue(mockUpdatedTask);

    const result = await updateTaskStatus_logic(taskId, newStatus);

    expect(result).toEqual(mockUpdatedTask);
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      { status: newStatus },
      { new: true, runValidators: true }
    );
  });

  it("should throw an error if the task is not found", async () => {
    const taskId = "nonexistentTaskId";
    const newStatus = "done";

    Task.findByIdAndUpdate.mockResolvedValue(null);

    await expect(updateTaskStatus_logic(taskId, newStatus)).rejects.toThrow(
      "Task not found"
    );
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      { status: newStatus },
      { new: true, runValidators: true }
    );
  });

  it("should throw an error if there is a problem with the database update operation", async () => {
    const taskId = "12345";
    const newStatus = "todo";

    const mockError = new Error("Database error");

    Task.findByIdAndUpdate.mockRejectedValue(mockError);

    await expect(updateTaskStatus_logic(taskId, newStatus)).rejects.toThrow(
      "Database error"
    );
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      { status: newStatus },
      { new: true, runValidators: true }
    );
  });
});
