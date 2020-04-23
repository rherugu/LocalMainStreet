const express = require("express");

const app = express();

const appjs = require("./src/backend/app");
require("dotenv/config");

app.use("/app", appjs);

app.listen(3001 || process.env.PORT, () => {
  console.log("mainbackend up and running");
});
