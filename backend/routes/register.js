import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { user_id, event_id } = req.body;

  db.get(
    "SELECT * FROM registrations WHERE user_id=? AND event_id=?",
    [user_id, event_id],
    (err, existing) => {
      if (existing) {
        return res.json({
          status: "error",
          message: "Already registered"
        });
      }

      db.get(
        `SELECT e.capacity, COUNT(r.id) as count
         FROM events e
         LEFT JOIN registrations r ON e.id=r.event_id
         WHERE e.id=?`,
        [event_id],
        (err2, data) => {
          if (data.count >= data.capacity) {
            return res.json({
              status: "error",
              message: "Event full"
            });
          }

          db.run(
            "INSERT INTO registrations(user_id,event_id) VALUES(?,?)",
            [user_id, event_id],
            function (err3) {
              res.json({
                status: "ok",
                payload: { id: this.lastID }
              });
            }
          );
        }
      );
    }
  );
});

export default router;