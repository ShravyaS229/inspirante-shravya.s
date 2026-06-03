import jwt from "jsonwebtoken";

export const checkUserSession = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: "error", message: "No token" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
};