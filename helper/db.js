const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// inspired by https://github.com/docker/awesome-compose/blob/master/react-express-mongodb/backend/db/index.js

const consoleLog = (msg, showLog) => {
  if (showLog) {
    console.log(msg);
  }
};

const connect = (app, showLog = true) => {
  const MONGODB_URL = process.env.MONGODB_URL;

  if (!MONGODB_URL) {
    console.error(
      "MongoDB connection failed. MONGODB_URL is not provided as an environment variable. No Database connection established."
    );
    return;
  }

  const options = {
    autoIndex: true, // Ensure indexes are built
    maxPoolSize: 10, // Maintain up to 10 socket connections
  };

  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;
    consoleLog("MongoDB connection with retry", showLog);
    mongoose
      .connect(MONGODB_URL, options)
      .then(() => {
        consoleLog("MongoDB is connected", showLog);
        app.emit("db:ready");
      })
      .catch((err) => {
        console.error(
          "MongoDB connection unsuccessful, retry after 2 seconds.",
          err
        );
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
};

module.exports = {
  connect,
};
