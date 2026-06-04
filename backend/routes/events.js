import express from "express";
import db from "../db.js";

const router = express.Router();

// GET EVENTS WITH ANALYTICS
router.get("/", (req, res) => {
  const query = `
    SELECT 
      e.id,
      e.name,
      e.date,
      e.venue,
      e.capacity,
      COUNT(r.id) AS registered
    FROM events e
    LEFT JOIN registrations r ON e.id = r.event_id
    GROUP BY e.id
    ORDER BY e.date ASC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.json({ status: "error", message: err.message });
    }

    res.json({
      status: "ok",
      payload: rows
    });
  });
});

// CREATE EVENT
router.post("/", (req, res) => {
  const { name, date, venue, capacity } = req.body;

  db.run(
    "INSERT INTO events(name,date,venue,capacity) VALUES(?,?,?,?)",
    [name, date, venue, capacity],
    function (err) {
      if (err) {
        return res.json({ status: "error", message: err.message });
      }

      res.json({ status: "ok", payload: { id: this.lastID } });
    }
  );
});

export default router;