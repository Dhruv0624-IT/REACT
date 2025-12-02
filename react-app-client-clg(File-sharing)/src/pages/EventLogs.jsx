import React from "react";
import { FaClock } from "react-icons/fa";
import { useLog } from "../context/LogContext";

// Helper function to format the ISO timestamp into a readable string
const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleString();
};

const EventLogs = () => {
  const { logs } = useLog();

  return (
    <div className="container mt-4">
      <h2>📝 Activity Logs</h2>
      {logs.length === 0 ? (
        <p className="text-muted">No activities recorded yet.</p>
      ) : (
        <div className="list-group mt-3 shadow-sm">
          {logs.map((log) => (
            <div
              key={log.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div>{log.action}</div>
              <div className="text-muted">
                <FaClock /> {formatTime(log.time)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventLogs;
