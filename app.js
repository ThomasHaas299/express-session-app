const express = require("express");
const session = require("express-session");
const {
  root,
  setValueInSession,
  getValue,
  clearSession,
} = require("./handler");

const app = express();
app.use(
  session({
    secret: "your-super-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.get("/", root);
app.get("/set/:anyValue", setValueInSession);
app.get("/get", getValue);
app.get("/clean", clearSession);

module.exports = app;
