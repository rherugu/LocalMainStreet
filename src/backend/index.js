const Joi = require("joi");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// Serve static assets if in production:
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("build"));

  app.get("*", (res, req) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const port = process.env.PORT || 3010;

app.listen(port, () => console.log(`Listening on port ${port}`));
