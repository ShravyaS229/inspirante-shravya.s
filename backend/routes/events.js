import express from "express";
import db from "../db.js";

const router = express.Router();

// GET EVENTS
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        e.id,
        e.name,
        e.event_date,
        e.venue,
        e.capacity,
        COUNT(r.id) AS registered
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      GROUP BY e.id
      ORDER BY e.event_date ASC
    `);

    res.json({ status: "ok", payload: rows });

  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
});

// CREATE EVENT
router.post("/", async (req, res) => {
  try {
    const { name, event_date, venue, capacity } = req.body;

    const [result] = await db.query(
      "INSERT INTO events (name, event_date, venue, capacity) VALUES (?, ?, ?, ?)",
      [name, event_date, venue, capacity]
    );

    res.json({ status: "ok", payload: { id: result.insertId } });

  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
});

export default router;