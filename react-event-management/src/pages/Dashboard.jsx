import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(data);
  }, []);

  const confirmed = registrations.filter(r => r.status === "Confirmed").length;
  const pending = registrations.filter(r => r.status === "Pending").length;

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Dashboard Report", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Phone", "Event", "Status"]],
      body: registrations.map(r => [r.name, r.email, r.phone, r.eventId, r.status]),
    });
    doc.save("dashboard_report.pdf");
  };

  const exportCSV = () => {
    const csv = Papa.unparse(registrations);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dashboard_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = (index, value) => {
    const updated = [...registrations];
    updated[index].status = value;
    setRegistrations(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Dashboard</h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ background: "#e0f7fa", padding: "1rem", borderRadius: 8, flex: 1 }}>
          Total Registrations: {registrations.length}
        </div>
        <div style={{ background: "#c8e6c9", padding: "1rem", borderRadius: 8, flex: 1 }}>
          Confirmed: {confirmed}
        </div>
        <div style={{ background: "#fff3cd", padding: "1rem", borderRadius: 8, flex: 1 }}>
          Pending: {pending}
        </div>
      </div>

      <button onClick={exportPDF} className="btn btn-danger btn-sm me-2">Export PDF</button>
      <button onClick={exportCSV} className="btn btn-success btn-sm">Export CSV</button>

      <div style={{ display: "flex", marginTop: "2rem", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h5>Registrations Pie</h5>
          <PieChart width={300} height={250}>
            <Pie
              data={[
                { name: "Confirmed", value: confirmed },
                { name: "Pending", value: pending },
              ]}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              <Cell fill="#4caf50" />
              <Cell fill="#ffc107" />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h5>Registrations Bar</h5>
          <BarChart width={300} height={250} data={[
            { name: "Confirmed", count: confirmed },
            { name: "Pending", count: pending },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#2196f3" />
          </BarChart>
        </div>
      </div>

      <h4 className="mt-4">Update Registration Status</h4>
      <table className="table table-bordered mt-2">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.status}</td>
              <td>
                <select className="form-select" value={r.status} onChange={(e) => handleStatusChange(i, e.target.value)}>
                  <option>Pending</option>
                  <option>Confirmed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
