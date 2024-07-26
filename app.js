const express = require("express");
const session = require("express-session");
const routes = require("./routes");

const app = express();

app.use(
  session({
    secret: "your-super-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use("/", routes);

module.exports = app;
