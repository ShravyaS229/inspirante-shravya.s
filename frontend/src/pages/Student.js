import React, { useEffect, useState } from "react";
import { getEvents, registerEvent } from "../api";

const Student = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await getEvents();
    if (res.status === "ok") {
      setEvents(res.payload);
    }
  };

  const handleRegister = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Login first");
      return;
    }

    const res = await registerEvent(user.id, eventId);

    if (res.status === "ok") {
      alert("Registered successfully");
      fetchEvents();
    } else {
      alert(res.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>
            {event.date} | {event.venue}
          </p>

          <button onClick={() => handleRegister(event.id)}>
            Register
          </button>
        </div>
      ))}
    </div>
  );
};

export default Student;