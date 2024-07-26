const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Session Middleware Setup
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Endpunkte
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

// Server starten
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
