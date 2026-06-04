import React, { useEffect, useState } from "react";
import { getEvents, registerEvent } from "../api";
import "./styles.css";

const Student = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await getEvents();
    if (res.status === "ok") setEvents(res.payload);
  };

  const handleRegister = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await registerEvent(user.id, eventId);

    if (res.status === "ok") {
      alert("Registered successfully");
      loadEvents();
    } else {
      alert(res.message);
    }
  };

  const getColor = (e) => {
    const percent = (e.registered / e.capacity) * 100;

    if (percent >= 80) return "red";
    if (percent >= 50) return "orange";
    return "green";
  };

  return (
    <div className="container">
      <h1 className="title">Student Dashboard</h1>

      <div className="grid">
        {events.map((e) => {
          const color = getColor(e);

          return (
            <div className={`card ${color}`} key={e.id}>
              <h2>{e.name}</h2>

              <p>{e.date} • {e.venue}</p>

              <p>
                Capacity: {e.capacity} <br />
                Registered: {e.registered} <br />
                Remaining: {e.capacity - e.registered}
              </p>

              <button
                className="btn"
                disabled={e.registered >= e.capacity}
                onClick={() => handleRegister(e.id)}
              >
                {e.registered >= e.capacity ? "FULL" : "Register"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Student;