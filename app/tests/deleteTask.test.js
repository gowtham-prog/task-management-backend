const Task = require("../models/task.model");
const deleteTask_logic = require("../accessors/deleteTask_logic");

jest.mock("../models/task.model");

describe("deleteTask_logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete and return the task when a valid taskId is provided", async () => {
    const taskId = "12345";
    const mockDeletedTask = {
      _id: taskId,
      name: "Sample Task",
      description: "Sample Description",
      user: "user1",
      createdAt: new Date(),
      dueDate: new Date("2024-11-30"),
    };

    Task.findByIdAndDelete.mockResolvedValue(mockDeletedTask);

    const result = await deleteTask_logic(taskId);

    expect(result).toEqual(mockDeletedTask);
    expect(Task.findByIdAndDelete).toHaveBeenCalledWith(taskId);
  });

  it("should throw an error if the task is not found", async () => {
    const taskId = "nonexistentTaskId";

    Task.findByIdAndDelete.mockResolvedValue(null);

    await expect(deleteTask_logic(taskId)).rejects.toThrow("Task not found");
    expect(Task.findByIdAndDelete).toHaveBeenCalledWith(taskId);
  });

  it("should throw an error if there is a problem with the database delete operation", async () => {
    const taskId = "12345";
    const mockError = new Error("Database error");

    Task.findByIdAndDelete.mockRejectedValue(mockError);

    await expect(deleteTask_logic(taskId)).rejects.toThrow("Database error");
    expect(Task.findByIdAndDelete).toHaveBeenCalledWith(taskId);
  });
});
