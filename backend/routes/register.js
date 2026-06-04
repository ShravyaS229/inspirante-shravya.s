import express from "express";
import db from "../db.js";

const router = express.Router();

/* -----------------------
   REGISTER EVENT
------------------------*/
router.post("/", (req, res) => {
  const { user_id, event_id } = req.body;

  db.get(
    "SELECT * FROM registrations WHERE user_id = ? AND event_id = ?",
    [user_id, event_id],
    (err, row) => {
      if (row) {
        return res.json({
          status: "error",
          message: "Already registered"
        });
      }

      db.run(
        "INSERT INTO registrations(user_id, event_id) VALUES (?,?)",
        [user_id, event_id],
        function (err) {
          if (err) {
            return res.json({
              status: "error",
              message: err.message
            });
          }

          res.json({
            status: "ok",
            message: "Registered successfully"
          });
        }
      );
    }
  );
});

/* -----------------------
   STUDENT: MY REGISTRATIONS
------------------------*/
router.get("/my/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT e.*
    FROM events e
    JOIN registrations r ON e.id = r.event_id
    WHERE r.user_id = ?
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.json({ status: "error", message: err.message });
    }

    res.json({ status: "ok", payload: rows });
  });
});

/* -----------------------
   ADMIN: EVENT REGISTRATIONS
------------------------*/
router.get("/event/:eventId", (req, res) => {
  const { eventId } = req.params;

  const query = `
    SELECT u.name, u.username
    FROM users u
    JOIN registrations r ON u.id = r.user_id
    WHERE r.event_id = ?
  `;

  db.all(query, [eventId], (err, rows) => {
    if (err) {
      return res.json({ status: "error", message: err.message });
    }

    res.json({ status: "ok", payload: rows });
  });
});

export default router;