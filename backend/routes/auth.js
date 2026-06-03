import express from "express";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const SECRET = "secretkey";

// insp-verified
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          status: "error",
          message: "Invalid login",
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, name: user.name },
        SECRET
      );

      res.json({
        status: "ok",
        payload: { token, user },
      });
    }
  );
});

export default router;