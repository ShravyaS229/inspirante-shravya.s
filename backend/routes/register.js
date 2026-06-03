import express from "express";
import db from "../db.js";

const router = express.Router();

// STUDENT REGISTER FOR EVENT
router.post("/", (req, res) => {
  const { user_id, event_id } = req.body;

  // 1. check duplicate registration
  db.get(
    "SELECT * FROM registrations WHERE user_id = ? AND event_id = ?",
    [user_id, event_id],
    (err, row) => {
      if (row) {
        return res.status(400).json({
          status: "error",
          message: "Already registered"
        });
      }

      // 2. insert registration
      db.run(
        "INSERT INTO registrations (user_id, event_id) VALUES (?, ?)",
        [user_id, event_id],
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
    }
  );
});

export default router;