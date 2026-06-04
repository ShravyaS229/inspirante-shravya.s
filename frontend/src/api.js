const BASE = "http://localhost:3000/api";

/* LOGIN */
export const login = async (username, password) => {
  try {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Network error"
    };
  }
};

/* EVENTS */
export const getEvents = async () => {
  try {
    const res = await fetch(`${BASE}/events`);

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Network error"
    };
  }
};

/* CREATE EVENT */
export const createEvent = async (data) => {
  try {
    const res = await fetch(`${BASE}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Network error"
    };
  }
};

/* REGISTER EVENT */
export const registerEvent = async (user_id, event_id) => {
  try {
    const res = await fetch(`${BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id, event_id })
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Network error"
    };
  }
};

/* STUDENT REGISTRATIONS */
export const getMyRegistrations = async (userId) => {
  try {
    const res = await fetch(`${BASE}/register/my/${userId}`);

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Network error"
    };
  }
};

/* EVENT REGISTRATIONS */
export const getEventRegistrations = async (eventId) => {
  try {
    const res = await fetch(`${BASE}/register/event/${eventId}`);

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Network error"
    };
  }
};