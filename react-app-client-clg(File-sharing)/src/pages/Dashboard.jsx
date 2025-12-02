import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { useLog } from "../context/LogContext";

// Helper function to format the ISO timestamp into a readable string
const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleString();
};

const Dashboard = () => {
  const { user, userList, fileList } = useAuth();
  const { logs } = useLog();

  // Admin-specific data
  const totalUsers = userList?.length || 0;
  const adminCount = userList?.filter((u) => u.role === "Admin").length || 0;
  const regularUserCount = totalUsers - adminCount;

  const pieData = [
    { name: "Admins", value: adminCount },
    { name: "Users", value: regularUserCount },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  const barData = [
    { name: "Users", count: totalUsers },
    { name: "Files", count: fileList?.length || 0 },
    { name: "Logs", count: logs?.length || 0 },
  ];

  // User-specific data
  const userFiles = fileList.filter(f => f.uploadedBy === user?.email);
  const userLogs = logs.filter(log => log.action.includes(user?.email));

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">
        {user?.role === "Admin" ? "📊 Admin Dashboard" : "👤 User Dashboard"}
      </h2>

      {user?.role === "Admin" ? (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h5 className="text-center">👥 User Roles</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h5 className="text-center">📦 Overview</h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-12">
            <div className="card p-3 shadow">
              <h5 className="text-center">📝 Recent Activity Logs</h5>
              <ul className="list-group list-group-flush">
                {logs?.slice(-5).reverse().map((log) => (
                  <li className="list-group-item" key={log.id}>
                    {formatTime(log.time)} - <strong>{log.action}</strong>
                  </li>
                )) || <p>No logs available</p>}
              </ul>
            </div>
          </div>

          {/* New section for Admin file list */}
          <div className="col-12">
            <div className="card p-3 shadow">
              <h5 className="text-center">🗂️ All Uploaded Files</h5>
              {fileList.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>Uploaded By</th>
                        <th>Uploaded At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileList.map((file) => (
                        <tr key={file.id}>
                          <td>{file.name}</td>
                          <td>{file.uploadedBy}</td>
                          <td>{formatTime(file.uploadedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted">No files have been uploaded yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-4 shadow text-center">
          <h5>Hello, {user?.name || "User"}!</h5>
          {userFiles.length > 0 ? (
            <p>Welcome to your dashboard. You have uploaded **{userFiles.length}** file(s).</p>
          ) : (
            <p>Welcome to your dashboard. You have not uploaded any files yet.</p>
          )}
          <p>This is a summary of your recent activities:</p>
          <ul className="list-group mt-3 mx-auto" style={{maxWidth: '400px'}}>
            {userLogs?.slice(-3).reverse().map((log) => (
                <li className="list-group-item d-flex justify-content-between" key={log.id}>
                    <span>{log.action}</span>
                    <span className="text-muted">{formatTime(log.time)}</span>
                </li>
            )) || <p>No recent activities.</p>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
