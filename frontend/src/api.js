const BASE_URL = "http://localhost:3000/api";

/* ================= LOGIN ================= */
export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  return res.json();
};

/* ================= GET EVENTS ================= */
export const getEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
};

/* ================= CREATE EVENT (ADMIN) ================= */
export const createEvent = async (eventData) => {
  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: eventData.name,
      date: eventData.date,
      venue: eventData.venue,
      capacity: eventData.capacity
    })
  });

  return res.json();
};

/* ================= REGISTER EVENT (STUDENT) ================= */
export const registerEvent = async (userId, eventId) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      event_id: eventId
    })
  });

  return res.json();
};