import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import eventsRoutes from "./routes/events.js";
import registerRoutes from "./routes/register.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/register", registerRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API running" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});