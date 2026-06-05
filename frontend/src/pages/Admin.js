import React, { useEffect, useState } from "react";
import { getEvents, createEvent, getEventRegistrations } from "../api";
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

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

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

  const viewRegs = async (eventId) => {
    const res = await getEventRegistrations(eventId);
    if (res.status === "ok") {
      setUsers(res.payload);
      setSelected(eventId);
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
      <h1 className="title">Admin Dashboard</h1>

      <div className="form">
        <input placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input placeholder="Venue"
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />
        <input type="number"
          placeholder="Capacity"
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />

        <button className="btn" onClick={handleCreate}>
          Create Event
        </button>
      </div>

      <div className="grid">
        {events.map((e) => (
          <div
            className={`card ${getColorClass(e.registered, e.capacity)}`}
            key={e.id}
          >
            <h2>{e.name}</h2>
            <p>{formatDate(e.event_date)} • {e.venue}</p>

            <p>Capacity: {e.capacity}</p>
            <p>Registered: {e.registered}</p>
            <p>Remaining: {e.capacity - e.registered}</p>

            <button className="btn" onClick={() => viewRegs(e.id)}>
              View Registrations
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="card">
          <h3>Registered Students</h3>
          {users.length === 0 ? (
            <p>No registrations yet</p>
          ) : (
            users.map((u) => (
              <p key={u.id}>{u.name} ({u.username})</p>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;