// src/pages/Calendar.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLog } from "../context/LogContext";
import { useAuth } from "../context/AuthContext";

// Helper function to format the ISO timestamp into a readable string
const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleString();
};

const ActivityCalendar = () => {
  const { logs } = useLog();
  const { user } = useAuth();
  const [markedDates, setMarkedDates] = useState(new Set());
  const [selectedDateLogs, setSelectedDateLogs] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    let currentLogs = [];
    if (user && user.role === 'Admin') {
      currentLogs = logs;
    } else if (user) {
      currentLogs = logs.filter(log => log.userId === user.id);
    }
    
    setFilteredLogs(currentLogs);

    const dates = new Set(
      currentLogs.map((log) => {
        const date = new Date(log.time);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      })
    );
    setMarkedDates(dates);
  }, [logs, user]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return markedDates.has(dateStr) ? "highlight" : null;
    }
  };

  const handleDayClick = (date) => {
    const clickedDateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    const dailyLogs = filteredLogs.filter(log => {
      const logDate = new Date(log.time);
      const logDateStr = `${logDate.getFullYear()}-${(logDate.getMonth() + 1).toString().padStart(2, '0')}-${logDate.getDate().toString().padStart(2, '0')}`;
      return logDateStr === clickedDateStr;
    });

    setSelectedDateLogs(dailyLogs);
    setSelectedDate(date);
  };

  return (
    <div className="container mt-4">
      <style>
        {`
        .react-calendar .react-calendar__tile.highlight {
          background-color: #007bff !important;
          color: white !important;
          border-radius: 50%;
          font-weight: bold;
        }
        .react-calendar .react-calendar__tile.highlight:hover {
          background-color: #0056b3 !important;
        }
        `}
      </style>
      <h2>📅 Activity Calendar</h2>
      {filteredLogs.length > 0 ? (
        <>
          <Calendar 
            tileClassName={tileClassName} 
            onClickDay={handleDayClick}
          />
          <p className="mt-3 text-muted">
            <span style={{ backgroundColor: '#007bff', color: 'white', padding: '0 8px', borderRadius: '50%' }}>&nbsp;</span> Days with activities logged.
          </p>

          {selectedDateLogs && selectedDateLogs.length > 0 && (
            <div className="card p-3 shadow mt-4">
              <h5>Activities for {selectedDate.toDateString()}</h5>
              <ul className="list-group list-group-flush">
                {selectedDateLogs.map((log) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={log.id}>
                    <span>{log.action}</span>
                    <span className="text-muted">{formatTime(log.time)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedDateLogs && selectedDateLogs.length === 0 && (
            <div className="card p-3 shadow mt-4 text-center text-muted">
                No activities logged on this date.
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-info text-center mt-4" role="alert">
          No activity logs found. Please perform some actions (e.g., log in, upload a file) to see the calendar update.
        </div>
      )}
    </div>
  );
};

export default ActivityCalendar;