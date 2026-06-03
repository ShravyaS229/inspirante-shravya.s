import express from "express";
import db  from "../db.js";

const router = express.Router();

// GET ALL EVENTS (PUBLIC - NO TOKEN REQUIRED)
router.get("/", (req, res) => {
  // insp-verified
  db.all("SELECT * FROM events ORDER BY date ASC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    }

    res.json({
      status: "ok",
      payload: rows
    });
  });
});

export default router;