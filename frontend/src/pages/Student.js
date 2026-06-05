import React, { useEffect, useState } from "react";
import { getEvents, registerEvent, getMyRegistrations } from "../api";
import "./styles.css";


const formatDate = (date) => {
  if (!date) return "N/A";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);

  return `${day}-${month}-${year}`;
};


const Student = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    loadEvents();
    loadMyRegistrations();
  }, []);


  const loadEvents = async () => {
    try {
      const res = await getEvents();

      if (res.status === "ok") {
        const sorted = res.payload.sort(
          (a, b) => new Date(a.event_date) - new Date(b.event_date)
        );
        setEvents(sorted);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log("insp-err", error);
      alert("Failed to load events");
    }
  };

  const loadMyRegistrations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await getMyRegistrations(user.id);

      if (res.status === "ok") {
        setMyEvents(res.payload);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log("insp-err", error);
      alert("Failed to load registrations");
    }
  };


  const handleRegister = async (eventId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await registerEvent(user.id, eventId);

      if (res.status === "ok") {
        alert("Registered successfully");
        loadEvents();
        loadMyRegistrations();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log("insp-err", error);
      alert("Registration failed");
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

      {}
      <h2>All Events</h2>

      <div className="grid">
        {events.map((e) => (
          <div
            key={e.id}
            className={`card ${getColorClass(e.registered, e.capacity)}`}
          >
            <h2>{e.name}</h2>

            <p>
              {formatDate(e.event_date)} • {e.venue}
            </p>

            <p>Capacity: {e.capacity}</p>
            <p>Registered: {e.registered}</p>
            <p>Remaining: {e.capacity - e.registered}</p>

            <button
              className="btn"
              disabled={e.registered >= e.capacity}
              onClick={() => handleRegister(e.id)}
            >
              {e.registered >= e.capacity ? "FULL" : "Register"}
            </button>
          </div>
        ))}
      </div>

      {}
      <h2>My Registrations</h2>

      <div className="grid">
        {myEvents.length === 0 ? (
          <p>No registrations yet</p>
        ) : (
          myEvents.map((e) => (
            <div className="card" key={e.id}>
              <h3>{e.name}</h3>
              <p>
                {formatDate(e.event_date)} • {e.venue}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Student;