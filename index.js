const app = require("./app");
const db = require("./helper/db.js");

const PORT = 3000;

db.connect(app);

// Server starten
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
