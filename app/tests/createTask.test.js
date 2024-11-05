const jwt = require("jsonwebtoken");
const Task = require("../models/task.model");
const createTask_logic = require("../accessors/createTask_logic");

jest.mock("../models/task.model");

describe("createTask_logic", () => {
  const mockUserId = "123456789abcdef";
  const mockToken = jwt.sign({ userId: mockUserId }, process.env.JWT_SECRET);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a task when a valid token is provided", async () => {
    const mockData = {
      name: "test",
      description: "test",
      details: "test",
      dueDate: "2024-11-30",
    };

    const mockCreatedTask = { ...mockData, user: mockUserId };

    Task.create.mockResolvedValue(mockCreatedTask);

    const task = await createTask_logic(mockToken, mockData);

    expect(task).toEqual(mockCreatedTask);
    expect(Task.create).toHaveBeenCalledWith({ ...mockData, user: mockUserId });
  });

  it("should throw an error when an invalid token is provided", async () => {
    const invalidToken = "invalidToken";
    const mockData = {
      name: "test",
      description: "test",
    };

    await expect(createTask_logic(invalidToken, mockData)).rejects.toThrow(
      "jwt malformed"
    );
  });
});
