const app = require("./app");
const PORT = 3000;

// Server starten
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
