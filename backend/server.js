import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import eventsRoutes from "./routes/events.js";
import registerRoutes from "./routes/register.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/register", registerRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API running" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});