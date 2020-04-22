const Joi = require("joi");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// Serve static assets if in production:
if (process.env.NODE_ENV === "production") {
  console.log("In Production!");
  // Set static folder
  app.use(express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
} else {
  console.log("hi!");
}
const port = process.env.PORT || 3010;

app.listen(port, () => console.log(`Listening on port ${port}`));
