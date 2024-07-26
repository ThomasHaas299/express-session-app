/* handler/index.js */

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

module.exports = {
  root,
  setValueInSession,
  getValue,
  clearSession,
  reportValidSession,
};
