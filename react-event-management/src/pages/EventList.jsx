import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

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

  const getImageForCategory = (category) => {
    const key = (category || "general").toLowerCase();
    if (key.includes("tech") || key.includes("workshop")) {
      return "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=900";
    }
    if (key.includes("music") || key.includes("concert")) {
      return "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=900";
    }
    if (key.includes("sports") || key.includes("game")) {
      return "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=900";
    }
    return "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=900";
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
        <div className="event-grid mt-3">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              className="card border-0 shadow-sm rounded-4 h-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={getImageForCategory(event.category)}
                alt={event.title}
                className="event-card-image"
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-primary-subtle text-primary">
                    {event.date || "TBA"}
                  </span>
                  <span className="text-muted small">
                    {event.category || "Uncategorized"}
                  </span>
                </div>
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text text-muted small mb-2">
                  {event.location || "Location TBA"}
                </p>
                {event.tags?.length > 0 && (
                  <div className="mb-3">
                    {event.tags.map((tag, idx) => (
                      <span key={idx} className="event-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate(`/edit/${event.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger ms-auto"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info mt-3">
          <p className="mb-1">No events match your filter.</p>
          <p className="mb-0">
            Try adjusting filters or{" "}
            <Link to="/add" className="alert-link">
              create a new event
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default EventList;
