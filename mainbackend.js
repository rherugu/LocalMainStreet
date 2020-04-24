const express = require("express");

const app = express();

const appjs = require("./src/backend/app");
require("dotenv/config");

app.use("/app", appjs);

app.listen(process.env.PORT || 3001, "0.0.0.0", () => {
  console.log("mainbackend up and running");
});
