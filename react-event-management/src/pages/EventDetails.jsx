import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    const found = stored.find((e) => e.id.toString() === id);
    if (found) setEvent(found);
  }, [id]);

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    const filtered = stored.filter((e) => e.id.toString() !== id);
    localStorage.setItem("events", JSON.stringify(filtered));
    navigate("/events");
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{event.title}</h2>
      <p>
        📅 {event.date} | 🕒 {event.time} | 📍 {event.location}
      </p>
      <p>{event.description}</p>
      <p>🏷️ Tags: {event.tags.join(", ")}</p>

      <div className="mt-3">
        <Link to={`/edit/${event.id}`} className="btn btn-warning me-2">
          ✏️ Edit
        </Link>
        <button className="btn btn-danger me-2" onClick={handleDelete}>
          🗑️ Delete
        </button>
        <Link to={`/register/${event.id}`} className="btn btn-success">
          📝 Register
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
