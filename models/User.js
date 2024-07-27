const mongoose = require("mongoose");

// To simplify the example, I'm not going to add any validation
//   AND I'm going to store the password in plain text.

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
