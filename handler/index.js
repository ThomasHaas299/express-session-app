/* handler/index.js */

const { default: mongoose } = require("mongoose");
const User = require("../models/User");

const root = (req, res) => {
  res.send("valid endpoints are /set/:anyValue, /get, /clean, /check");
};

const setValueInSession = (req, res) => {
  req.session.value = req.params.anyValue;
  res.send(`Value set to ${req.params.anyValue}`);
};

const getValue = (req, res) => {
  const value = req.session.value;
  res.send(`Stored value is ${value}`);
};

const clearSession = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not clear session");
    }
    res.send("Session cleared");
  });
};

const reportValidSession = (req, res) => {
  res.send("Session value is valid");
};

const login = async (req, res) => {
  if (
    process.env.NODE_ENV !== "test" &&
    mongoose.connection.readyState !== mongoose.STATES.connected
  ) {
    return res.status(500).send("Database connection failed");
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }
    req.session.value = "foo";
    res.send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  root,
  setValueInSession,
  getValue,
  clearSession,
  reportValidSession,
  login,
};
