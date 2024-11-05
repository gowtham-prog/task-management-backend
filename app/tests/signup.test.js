const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const signup_logic = require("../accessors/signup_logic");

jest.mock("../models/user.model");
jest.mock("bcrypt");

describe("signup_logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully create a new user with a hashed password", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const hashedPassword = "hashedPassword123";
    const savedUser = {
      _id: "12345",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: hashedPassword,
    };

    bcrypt.genSalt.mockResolvedValue(10);
    bcrypt.hash.mockResolvedValue(hashedPassword);
    User.prototype.save = jest.fn().mockResolvedValue(savedUser);

    const result = await signup_logic(userData);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(User.prototype.save).toHaveBeenCalled();
    expect(result).toEqual(savedUser);
  });

  it("should throw an error if user.save() fails", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const errorMessage = "Error saving user";
    bcrypt.genSalt.mockResolvedValue(10);
    bcrypt.hash.mockResolvedValue("hashedPassword123");
    User.prototype.save = jest.fn().mockRejectedValue(new Error(errorMessage));

    await expect(signup_logic(userData)).rejects.toThrow(errorMessage);
    expect(User.prototype.save).toHaveBeenCalled();
  });
});
