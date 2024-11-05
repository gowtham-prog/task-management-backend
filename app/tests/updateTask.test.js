const Task = require("../models/task.model");
const updateTask_logic = require("../accessors/updateTask_logic");

jest.mock("../models/task.model");

describe("updateTask_logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return the task when a valid taskId and updateData are provided", async () => {
    const taskId = "12345";
    const updateData = {
      name: "Updated Task Name",
      description: "Updated Description",
    };

    const mockUpdatedTask = {
      _id: taskId,
      name: "Updated Task Name",
      description: "Updated Description",
      user: "user1",
      createdAt: new Date(),
      dueDate: new Date("2024-11-30"),
    };

    Task.findByIdAndUpdate.mockResolvedValue(mockUpdatedTask);

    const result = await updateTask_logic(taskId, updateData);

    expect(result).toEqual(mockUpdatedTask);
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(taskId, updateData, {
      new: true,
      runValidators: true,
    });
  });

  it("should throw an error if the task is not found", async () => {
    const taskId = "nonexistentTaskId";
    const updateData = { name: "New Task Name" };

    Task.findByIdAndUpdate.mockResolvedValue(null);

    await expect(updateTask_logic(taskId, updateData)).rejects.toThrow(
      "Task not found"
    );
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(taskId, updateData, {
      new: true,
      runValidators: true,
    });
  });

  it("should throw an error if there is a problem with the database update operation", async () => {
    const taskId = "12345";
    const updateData = { name: "Another Task Name" };

    const mockError = new Error("Database error");

    Task.findByIdAndUpdate.mockRejectedValue(mockError);

    await expect(updateTask_logic(taskId, updateData)).rejects.toThrow(
      "Database error"
    );
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(taskId, updateData, {
      new: true,
      runValidators: true,
    });
  });
});
