import { useEffect, useState } from "react";
import { getEvents, createEvent } from "../api";

export default function Admin({ user }) {
  console.log("insp-riverstone");

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    date: "",
    venue: "",
    capacity: ""
  });

  const loadEvents = async () => {
    try {
      const res = await getEvents(user.token);
      console.log("insp-err", res);
      setEvents(res.payload);
    } catch (error) {
      console.log("insp-err", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = async () => {
    try {
      await createEvent(form, user.token);
      loadEvents();
    } catch (error) {
      console.log("insp-err", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <input placeholder="name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input placeholder="venue" onChange={(e) => setForm({ ...form, venue: e.target.value })} />
      <input placeholder="capacity" onChange={(e) => setForm({ ...form, capacity: e.target.value })} />

      <button onClick={handleCreate}>Create Event</button>

      <h3>Events</h3>

      {events.map((e) => (
        <div key={e.id}>
          {e.name} | {e.date} | {e.venue} | {e.capacity}
        </div>
      ))}
    </div>
  );
}