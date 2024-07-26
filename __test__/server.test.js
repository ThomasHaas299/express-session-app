const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

const testValue = "any value";

jest.mock("../models/User");

describe("Session Endpoints", () => {
  const agent = request.agent(app);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set a value in the session", async () => {
    const response = await agent.get(`/set/${testValue}`);
    expect(response.text).toBe(`Value set to ${testValue}`);
  });

  it("should get the stored value from the session", async () => {
    // hint: the following line is only needed if the previous test is not run
    await agent.get(`/set/${testValue}`);
    const response = await agent.get("/get");
    expect(response.text).toBe(`Stored value is ${testValue}`);
  });

  it("should clear the session", async () => {
    await agent.get("/set/testValue");
    const clearResponse = await agent.get("/clean");
    expect(clearResponse.text).toBe("Session cleared");
    const getResponse = await agent.get("/get");
    expect(getResponse.text).toBe("Stored value is undefined");
  });

  it('should return 401 if session value is not "foo"', async () => {
    await agent.get("/set/bar");
    const response = await agent.get("/check");
    expect(response.status).toBe(401);
  });

  it('should return 200 if session value is "foo"', async () => {
    await agent.get("/set/foo");
    const response = await agent.get("/check");
    expect(response.status).toBe(200);
  });

  it("should login successfully with correct credentials", async () => {
    User.findOne.mockResolvedValue({
      username: "testUser",
      password: "testPass",
    });
    const response = await agent
      .post("/login")
      .send({ username: "testUser", password: "testPass" });
    expect(response.text).toBe("Login successful");
    expect(response.status).toBe(200);
  });

  it("should fail login with incorrect credentials", async () => {
    User.findOne.mockResolvedValue(null);
    const response = await agent
      .post("/login")
      .send({ username: "testUser", password: "wrongPass" });
    expect(response.text).toBe("Invalid username or password");
    expect(response.status).toBe(401);
  });
});
