const request = require("supertest");
const app = require("../app");

const testValue = "any value";

describe("Session Endpoints", () => {
  const agent = request.agent(app);

  it("should set a value in the session", async () => {
    const response = await agent.get(`/set/${testValue}`);
    expect(response.text).toBe(`Value set to ${testValue}`);
  });

  it("should get the stored value from the session", async () => {
    //await agent.get(`/set/${testValue}`);
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
});
