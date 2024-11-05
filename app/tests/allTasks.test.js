const allTasks_logic = require("../accessors/allTasks_logic");
const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

jest.mock("../models/task.model");

describe("allTasks_logic", () => {
  const userId = "testUserId";
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  const mockTasks = [
    { _id: "task1", title: "Test Task 1", user: userId },
    { _id: "task2", title: "Test Task 2", user: userId },
  ];

  beforeEach(() => {
    Task.find.mockClear();
  });

  it("should return tasks for a given userId", async () => {
    Task.find.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTasks),
      }),
    });

    const tasks = await allTasks_logic(token);

    expect(Task.find).toHaveBeenCalledWith({ user: userId });
    expect(tasks).toEqual(mockTasks);
  });

  it("should throw an error if token is invalid", async () => {
    const invalidToken = "invalidToken";

    await expect(allTasks_logic(invalidToken)).rejects.toThrow();
  });

  it("should throw an error if userId is not present in the token", async () => {
    const tokenWithoutUserId = jwt.sign({}, process.env.JWT_SECRET);

    await expect(allTasks_logic(tokenWithoutUserId)).rejects.toThrow(
      "User ID not found in token"
    );
  });
});
