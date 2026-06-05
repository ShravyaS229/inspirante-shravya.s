import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.json({ status: "error", message: "Invalid credentials" });
    }

    const user = rows[0];

    res.json({
      status: "ok",
      payload: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role
        },
        token: "demo-token"
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Server error" });
  }
});

export default router;