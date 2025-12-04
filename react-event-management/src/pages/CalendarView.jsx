import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(stored);
  }, []);

  const handleDateClick = (value) => {
    setDate(value);
  };

  // Precompute a set of date strings that have at least one event
  const eventDateSet = useMemo(() => {
    const set = new Set();
    events.forEach((e) => {
      if (e.date) {
        const d = new Date(e.date);
        if (!isNaN(d)) {
          set.add(d.toDateString());
        }
      }
    });
    return set;
  }, [events]);

  const matchedEvents = events.filter(
    (e) => new Date(e.date).toDateString() === date.toDateString()
  );

  return (
    <div className="container mt-4">
      <div className="row g-4 align-items-start">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h2 className="h4 mb-3">Event Calendar</h2>
              <p className="text-muted small mb-3">
                Dates with events are highlighted. Click a date to see its
                events on the right.
              </p>
              <Calendar
                onChange={handleDateClick}
                value={date}
                tileClassName={({ date: tileDate, view }) => {
                  if (view === "month") {
                    const key = tileDate.toDateString();
                    if (eventDateSet.has(key)) {
                      return "calendar-has-event";
                    }
                  }
                  return null;
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h4 className="h5 mb-3">
                Events on <span className="text-primary">{date.toDateString()}</span>
              </h4>
              {matchedEvents.length ? (
                <ul className="list-group">
                  {matchedEvents.map((e) => (
                    <li
                      key={e.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{e.title}</strong>
                        <div className="small text-muted">
                          {e.location || "Location TBA"}
                        </div>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => navigate(`/event/${e.id}`)}
                      >
                        View
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted mb-0">No events scheduled for this date.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
