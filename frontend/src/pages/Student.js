import React, { useEffect, useState } from "react";
import { getEvents, registerEvent, getMyRegistrations } from "../api";
import "./styles.css";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
};

const Student = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    loadEvents();
    loadMyRegs();
  }, []);

  const loadEvents = async () => {
    const res = await getEvents();

    if (res.status === "ok") {
      setEvents(res.payload);
    }
  };

  const loadMyRegs = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await getMyRegistrations(user.id);

    if (res.status === "ok") {
      setMyEvents(res.payload);
    }
  };

  const handleRegister = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await registerEvent(user.id, eventId);

    if (res.status === "ok") {
      alert("Registered successfully");
      loadEvents();
      loadMyRegs();
    } else {
      alert(res.message);
    }
  };

  const getColorClass = (registered, capacity) => {
    const percent = (registered / capacity) * 100;

    if (percent >= 80) return "red";
    if (percent >= 50) return "orange";

    return "green";
  };

  return (
    <div className="container">
      <h1 className="title">Student Dashboard</h1>

      <h2>All Events</h2>

      <div className="grid">
        {events.map((e) => (
          <div
            key={e.id}
            className={`card ${getColorClass(
              Number(e.registered),
              Number(e.capacity)
            )}`}
          >
            <h2>{e.name}</h2>

            <p>{formatDate(e.date)}</p>

            <p>{e.venue}</p>

            <p>
              Capacity: <b>{e.capacity}</b>
            </p>

            <p>
              Registered: <b>{e.registered}</b>
            </p>

            <p>
              Remaining: <b>{e.capacity - e.registered}</b>
            </p>

            <button
              className="btn"
              disabled={e.registered >= e.capacity}
              onClick={() => handleRegister(e.id)}
            >
              {e.registered >= e.capacity
                ? "FULL"
                : "Register"}
            </button>
          </div>
        ))}
      </div>

      <h2>My Registrations</h2>

      <div className="grid">
        {myEvents.map((e) => (
          <div className="card" key={e.id}>
            <h3>{e.name}</h3>
            <p>{formatDate(e.date)}</p>
            <p>{e.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;