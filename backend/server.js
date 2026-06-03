require("dotenv").config();

const express = require("express");
const db = require("./config/db");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});