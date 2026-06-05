import express from "express";
import db from "../db.js";

const router = express.Router();


router.post("/", async (req, res) => {
  const { user_id, event_id } = req.body;

  try {
    
    const [existing] = await db.query(
      "SELECT * FROM registrations WHERE user_id = ? AND event_id = ?",
      [user_id, event_id]
    );

    if (existing.length > 0) {
      return res.json({
        status: "error",
        message: "Already registered"
      });
    }

 
    const [event] = await db.query(
      `SELECT e.capacity, COUNT(r.id) AS count
       FROM events e
       LEFT JOIN registrations r ON e.id = r.event_id
       WHERE e.id = ?
       GROUP BY e.id`,
      [event_id]
    );

    if (event.length > 0 && event[0].count >= event[0].capacity) {
      return res.json({
        status: "error",
        message: "Event full"
      });
    }

    
    await db.query(
      "INSERT INTO registrations (user_id, event_id) VALUES (?,?)",
      [user_id, event_id]
    );

    res.json({
      status: "ok",
      message: "Registered successfully"
    });

  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

router.get("/my/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT e.*
      FROM events e
      JOIN registrations r ON e.id = r.event_id
      WHERE r.user_id = ?
    `, [userId]);

    res.json({ status: "ok", payload: rows });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});


router.get("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT u.name, u.username
      FROM users u
      JOIN registrations r ON u.id = r.user_id
      WHERE r.event_id = ?
    `, [eventId]);

    res.json({ status: "ok", payload: rows });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

export default router;