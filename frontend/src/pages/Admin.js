import React, { useEffect, useState } from "react";
import { getEvents, createEvent } from "../api";
import "./styles.css";

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    venue: "",
    capacity: ""
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await getEvents();
    if (res.status === "ok") setEvents(res.payload);
  };

  const handleCreate = async () => {
    const res = await createEvent(form);
    if (res.status === "ok") {
      alert("Event created");
      loadEvents();
    }
  };

  // ANALYTICS
  const totalEvents = events.length;

  const totalRegistrations = events.reduce(
    (sum, e) => sum + Number(e.registered || 0),
    0
  );

  const avgFill =
    events.length > 0
      ? Math.round(
          events.reduce(
            (sum, e) => sum + (e.registered / e.capacity) * 100,
            0
          ) / events.length
        )
      : 0;

  return (
    <div className="container">
      <h1 className="title">Admin Dashboard</h1>

      {/* ANALYTICS CARDS */}
      <div className="analytics">
        <div className="a-card">Total Events: {totalEvents}</div>
        <div className="a-card">Registrations: {totalRegistrations}</div>
        <div className="a-card">Avg Fill: {avgFill}%</div>
      </div>

      {/* FORM */}
      <div className="form">
        <input placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input placeholder="Date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input placeholder="Venue"
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />
        <input placeholder="Capacity"
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />

        <button className="btn" onClick={handleCreate}>
          Create Event
        </button>
      </div>

      {/* EVENTS */}
      <div className="grid">
        {events.map((e) => {
          const percent = (e.registered / e.capacity) * 100;

          let color = "green";
          if (percent >= 80) color = "red";
          else if (percent >= 50) color = "orange";

          return (
            <div className={`card ${color}`} key={e.id}>
              <h2>{e.name}</h2>

              <p>{e.date} • {e.venue}</p>

              <p>
                Capacity: {e.capacity} <br />
                Registered: {e.registered} <br />
                Fill: {Math.round(percent)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;