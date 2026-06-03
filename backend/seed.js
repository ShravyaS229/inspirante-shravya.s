import db from "./db.js";

// wait for DB setup
db.serialize(() => {

  // ADMIN
  db.run(
    "INSERT OR IGNORE INTO users (name, username, password, role) VALUES (?, ?, ?, ?)",
    ["Admin", "admin", "inspirante2026", "admin"]
  );

  // STUDENTS
  const students = [
    ["Asha Rao", "asha.rao", "student123", "student"],
    ["Ravi Shetty", "ravi.shetty", "student123", "student"],
    ["Meera Nair", "meera.nair", "student123", "student"],
    ["Kiran Bhat", "kiran.bhat", "student123", "student"],
    ["Divya Kamath", "divya.kamath", "student123", "student"],
    ["Suresh Pai", "suresh.pai", "student123", "student"],
    ["Ananya Hegde", "ananya.hegde", "student123", "student"],
    ["Rohan Shenoy", "rohan.shenoy", "student123", "student"],
    ["Nisha Prabhu", "nisha.prabhu", "student123", "student"],
    ["Tejas Mallya", "tejas.mallya", "student123", "student"],
    ["Priya Bangera", "priya.bangera", "student123", "student"],
  ];

  students.forEach(s => {
    db.run(
      "INSERT OR IGNORE INTO users (name, username, password, role) VALUES (?, ?, ?, ?)",
      s
    );
  });

  // EVENTS
  const events = [
    ["Tech Symposium 2026", "2026-07-10", "Main Auditorium", 120],
    ["Hackathon", "2026-07-15", "Lab Block C", 40],
    ["Cultural Fest", "2026-07-20", "Open Amphitheatre", 300],
    ["Workshop: React Basics", "2026-07-22", "Seminar Hall 2", 30],
    ["Placement Prep Talk", "2026-07-25", "Main Auditorium", 200],
  ];

  events.forEach(e => {
    db.run(
      "INSERT INTO events (name, date, venue, capacity) VALUES (?, ?, ?, ?)",
      e
    );
  });

  console.log("Seed completed successfully");
});