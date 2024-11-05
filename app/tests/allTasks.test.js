const Task = require("../models/task.model");
const allTasks_logic = require("../accessors/allTasks_logic");

jest.mock("../models/task.model");

describe("allTasks_logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of tasks with populated user fields", async () => {
    const mockTasks = [
      {
        _id: "task1",
        name: "test_1",
        description: "test_1",
        user: {
          _id: "test_1",
          firstName: "test_1",
          lastName: "test_1",
          email: "test_1@example.com",
        },
      },
      {
        _id: "task2",
        name: "test_2",
        description: "test_2",
        user: {
          _id: "test_2",
          firstName: "test_2",
          lastName: "test_2",
          email: "test_2@example.com",
        },
      },
    ];

    Task.find.mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockTasks),
    });

    const tasks = await allTasks_logic();

    expect(tasks).toEqual(mockTasks);
    expect(Task.find).toHaveBeenCalled();
    expect(Task.find().populate).toHaveBeenCalledWith(
      "user",
      "firstName lastName email"
    );
    expect(Task.find().exec).toHaveBeenCalled();
  });

  it("should throw an error if there is a problem fetching tasks", async () => {
    const mockError = new Error("Database error");

    Task.find.mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(mockError),
    });

    await expect(allTasks_logic()).rejects.toThrow("Database error");
  });
});
