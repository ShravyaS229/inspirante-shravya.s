import express from "express";
import cors from "cors";

import eventsRoutes from "./routes/events.js";

const app = express();

// insp-verified
app.use(cors());
app.use(express.json());

// routes
app.use("/api/events", eventsRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});