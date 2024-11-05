const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const login_logic = require("../accessors/login_logic");

jest.mock("../models/user.model");
jest.mock("bcrypt");

describe("login_logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data without the password field for a valid email and password", async () => {
    const email = "test@example.com";
    const password = "password123";
    const user = {
      _id: "12345",
      firstName: "John",
      lastName: "Doe",
      email: email,
      password: "$2b$10$hashedpassword",
      toObject: jest.fn().mockReturnValue({
        _id: "12345",
        firstName: "John",
        lastName: "Doe",
        email: email,
      }),
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);

    const result = await login_logic(email, password);

    const { password: _, ...expectedUserData } = user.toObject();
    expect(result).toEqual(expectedUserData);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
  });

  it("should throw an error if user is not found", async () => {
    const email = "notfound@example.com";
    const password = "password123";

    User.findOne.mockResolvedValue(null);

    await expect(login_logic(email, password)).rejects.toThrow(
      "User not found"
    );
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("should throw an error if password does not match", async () => {
    const email = "test@example.com";
    const password = "wrongpassword";
    const user = {
      _id: "12345",
      firstName: "John",
      lastName: "Doe",
      email: email,
      password: "$2b$10$hashedpassword",
      toObject: jest.fn().mockReturnValue({
        _id: "12345",
        firstName: "John",
        lastName: "Doe",
        email: email,
      }),
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    await expect(login_logic(email, password)).rejects.toThrow(
      "Invalid password"
    );
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
  });
});
