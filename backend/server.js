import express from "express";
import cors from "cors";

import eventsRoutes from "./routes/events.js";
import authRoutes from "./routes/auth.js";
import registerRoutes from "./routes/register.js";

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/events", eventsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", registerRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});