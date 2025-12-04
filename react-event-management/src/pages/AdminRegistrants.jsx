import React, { useEffect, useState } from "react";
import { exportToCSV } from "../utils/exportCSV";
import "./AdminRegistrants.css"; // optional for custom styling

const AdminRegistrants = () => {
  const [registrants, setRegistrants] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrants(stored);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...registrants];
    updated[index].status = newStatus;
    setRegistrants(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  const handleExport = () => {
    exportToCSV(registrants, "event_registrations");
  };

  return (
    <div className="admin-container">
      <h2>👤 All Registrants (Admin View)</h2>
      {registrants.length === 0 ? (
        <p>No registrants found.</p>
      ) : (
        <>
          <button className="export-btn" onClick={handleExport}>
            📄 Export CSV
          </button>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {registrants.map((reg, idx) => (
                <tr key={idx}>
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.status}</td>
                  <td>
                    <select
                      value={reg.status}
                      onChange={(e) => handleStatusChange(idx, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminRegistrants;
