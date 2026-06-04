import React, { useEffect, useState } from "react";
import {
  getEvents,
  createEvent,
  getEventRegistrations
} from "../api";
import "./styles.css";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
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

    if (res.status === "ok") {
      setEvents(res.payload);
    }
  };

  const handleCreate = async () => {
    const res = await createEvent(form);

    if (res.status === "ok") {
      alert("Event created");

      setForm({
        name: "",
        date: "",
        venue: "",
        capacity: ""
      });

      loadEvents();
    } else {
      alert(res.message);
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

  const totalEvents = events.length;

  const totalRegistrations = events.reduce(
    (sum, e) => sum + Number(e.registered),
    0
  );

  return (
    <div className="container">
      <h1 className="title">Admin Dashboard</h1>

      <div className="analytics">
        <div className="a-card">
          <h3>Total Events</h3>
          <h2>{totalEvents}</h2>
        </div>

        <div className="a-card">
          <h3>Total Registrations</h3>
          <h2>{totalRegistrations}</h2>
        </div>
      </div>

      <div className="form">
        <input
          placeholder="Event Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value
            })
          }
        />

        <input
          placeholder="Venue"
          value={form.venue}
          onChange={(e) =>
            setForm({
              ...form,
              venue: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) =>
            setForm({
              ...form,
              capacity: e.target.value
            })
          }
        />

        <button
          className="btn"
          onClick={handleCreate}
        >
          Create Event
        </button>
      </div>

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

            <p>
              Fill Percentage:{" "}
              <b>
                {Math.round(
                  (Number(e.registered) /
                    Number(e.capacity)) *
                    100
                )}
                %
              </b>
            </p>

            <button
              className="btn"
              onClick={() => viewRegs(e.id)}
            >
              View Registrations
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="card">
          <h2>Registered Students</h2>

          {users.length === 0 ? (
            <p>No registrations yet</p>
          ) : (
            users.map((u) => (
              <p key={u.id}>
                {u.name} ({u.username})
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;