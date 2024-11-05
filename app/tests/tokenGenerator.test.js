const jwt = require("jsonwebtoken");
const tokengenerator = require("../accessors/token_generator");
require("dotenv").config();

jest.mock("jsonwebtoken");

describe("tokengenerator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a token for a valid user ID", () => {
    const userId = "12345";
    const mockToken = "mocked.jwt.token";

    jwt.sign.mockReturnValue(mockToken);

    const result = tokengenerator(userId);

    expect(result).toBe(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  it("should throw an error if token generation fails", () => {
    const userId = "12345";
    const mockError = new Error("Token generation failed");

    jwt.sign.mockImplementation(() => {
      throw mockError;
    });

    expect(() => tokengenerator(userId)).toThrow("Token generation failed");
    expect(jwt.sign).toHaveBeenCalledWith({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });
});
