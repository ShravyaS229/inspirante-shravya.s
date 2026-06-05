import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "shravyabhat_0409",
  database: process.env.DB_NAME || "inspirante_portal",
  waitForConnections: true,
  connectionLimit: 10
});

console.log("MySQL connected successfully");

export default db;