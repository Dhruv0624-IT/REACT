import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(stored);
  }, []);

  const categories = [...new Set(events.map((e) => e.category || "Uncategorized"))];
  const tags = [...new Set(events.flatMap((e) => e.tags || []))];

  let filteredEvents = filter === "All" ? events : events.filter(e => e.category === filter);
  if (selectedTag !== "All") {
    filteredEvents = filteredEvents.filter((e) => e.tags?.includes(selectedTag));
  }

  const handleDelete = (id) => {
    const updated = events.filter((event) => event.id !== id);
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4">
      <h2>📋 Event List</h2>

      <div className="mb-3 d-flex gap-3 flex-wrap">
        <div>
          <label>Category: </label>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tag: </label>
          <select
            className="form-select"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="All">All</option>
            {tags.map((tag, i) => (
              <option key={i} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredEvents.length ? (
        <div className="list-group">
          {filteredEvents.map((event) => (
            <div key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{event.title}</h5>
                <p>{event.date} | {event.location}</p>
                <small className="text-muted">Category: {event.category}</small><br />
                {event.tags?.length > 0 && (
                  <small className="text-muted">Tags: {event.tags.join(", ")}</small>
                )}
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  View
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate(`/edit/${event.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events match your filter.</p>
      )}
    </div>
  );
}

export default EventList;
