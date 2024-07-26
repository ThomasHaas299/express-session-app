const express = require("express");
const session = require("express-session");

const app = express();
app.use(
  session({
    secret: "your-super-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.get("/", (req, res) => {
  res.send("valid endpoints are /set/:anyValue, /get, and /clean");
});

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

module.exports = app;
