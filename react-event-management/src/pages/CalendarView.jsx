import React, { useState, useEffect } from "react";
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

  const matchedEvents = events.filter(
    (e) => new Date(e.date).toDateString() === date.toDateString()
  );

  return (
    <div>
      <h2>Calendar View</h2>
      <Calendar onChange={handleDateClick} value={date} />

      <h4 className="mt-3">Events on {date.toDateString()}</h4>
      {matchedEvents.length ? (
        <ul className="list-group">
          {matchedEvents.map((e) => (
            <li key={e.id} className="list-group-item d-flex justify-content-between">
              <span>{e.title}</span>
              <button className="btn btn-sm btn-outline-info" onClick={() => navigate(`/event/${e.id}`)}>View</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events.</p>
      )}
    </div>
  );
}

export default CalendarView;
