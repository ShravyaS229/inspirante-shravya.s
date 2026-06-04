const BASE = "http://localhost:3000/api";

// LOGIN
export const login = async (username, password) => {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return res.json();
};

// GET EVENTS
export const getEvents = async () => {
  const res = await fetch(`${BASE}/events`);
  return res.json();
};

// CREATE EVENT (ADMIN)
export const createEvent = async (data) => {
  const res = await fetch(`${BASE}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      date: data.date,
      venue: data.venue,
      capacity: Number(data.capacity)
    })
  });

  return res.json();
};

// REGISTER EVENT (STUDENT)
export const registerEvent = async (user_id, event_id) => {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id, event_id })
  });

  return res.json();
};