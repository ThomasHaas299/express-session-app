const request = require("supertest");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Express-App Setup für Tests
const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: "test-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/set/:anyValue", (req, res) => {
  req.session.value = req.params.anyValue;
  res.send(`Value set to ${req.params.anyValue}`);
});

app.get("/get", (req, res) => {
  const value = req.session.value;
  res.send(`Stored value is ${value}`);
});

app.get("/clean", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not clear session");
    }
    res.send("Session cleared");
  });
});

const testValue = "any great value";

describe("Session Endpoints", () => {
  const agent = request.agent(app);

  it("should set a value in the session", async () => {
    const response = await agent.get(`/set/${testValue}`);
    expect(response.text).toBe(`Value set to ${testValue}`);
  });

  it("should get the stored value from the session", async () => {
    // await agent.get(`/set/${testValue}`);
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
