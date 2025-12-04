import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-toastify";

function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    id: Date.now(),
    title: "",
    date: "",
    location: "",
    category: "",
    tags: [],
    description: "",
  });

  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (id) {
      const events = JSON.parse(localStorage.getItem("events")) || [];
      const existing = events.find((e) => e.id.toString() === id);
      if (existing) {
        setEvent(existing);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleTags = (e) => {
    setEvent((prev) => ({ ...prev, tags: e.target.value.split(",") }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("events")) || [];

    if (id) {
      const updated = stored.map((e) =>
        e.id.toString() === id ? event : e
      );
      localStorage.setItem("events", JSON.stringify(updated));
      toast.success("Event updated successfully");
    } else {
      const newEvent = { ...event, id: Date.now() };
      stored.push(newEvent);
      localStorage.setItem("events", JSON.stringify(stored));
      toast.success("Event created successfully");
    }

    setShowQR(true);
    setTimeout(() => {
      navigate("/events");
    }, 9000); 
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "✏️ Edit Event" : "➕ Create Event"}</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={event.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            name="location"
            value={event.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <input
            name="category"
            value={event.category}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. Workshop, Seminar"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Tags (comma separated)</label>
          <input
            value={event.tags.join(",")}
            onChange={handleTags}
            className="form-control"
            placeholder="e.g. Tech, Coding"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Event description"
          />
        </div>

        <div className="col-12">
          <button className="btn btn-success" type="submit">
            {id ? "Update Event" : "Create Event"}
          </button>
        </div>
      </form>

      {showQR && (
        <div className="mt-5">
          <div className="alert alert-info text-center">
            <h5>📩 Email Sent (Simulated)</h5>
            <p>Here’s a preview of the email confirmation:</p>
          </div>

          <div className="card p-3 mb-4 shadow-sm">
            <h5 className="mb-2">📧 To: you@example.com</h5>
            <p><strong>Subject:</strong> Event Confirmation - {event.title}</p>
            <p>Hello,</p>
            <p>
              Your event "<strong>{event.title}</strong>" has been successfully{" "}
              {id ? "updated" : "created"}.
            </p>
            <ul>
              <li><strong>Date:</strong> {event.date}</li>
              <li><strong>Location:</strong> {event.location}</li>
              <li><strong>Category:</strong> {event.category}</li>
            </ul>
            <p>Thank you for using our event portal.</p>
            <p className="text-muted">- Event Manager</p>
          </div>

          <div className="text-center">
            <p>Scan QR to view event:</p>
            <QRCode value={`Event: ${event.title}`} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EventForm;
