import express from "express";
import db from "../db.js";

const router = express.Router();

// GET ALL EVENTS
router.get("/", (req, res) => {
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

// CREATE EVENT (ADMIN)
router.post("/", (req, res) => {
  const { name, date, venue, capacity } = req.body;

  db.run(
    "INSERT INTO events (name,date,venue,capacity) VALUES (?,?,?,?)",
    [name, date, venue, capacity],
    function (err) {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err.message
        });
      }

      res.json({
        status: "ok",
        payload: { id: this.lastID }
      });
    }
  );
});

export default router;