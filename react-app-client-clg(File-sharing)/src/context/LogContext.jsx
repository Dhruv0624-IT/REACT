import React, { createContext, useContext, useState, useEffect } from "react";

const LogContext = createContext();

export const useLog = () => useContext(LogContext);

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState(() => {
    const storedLogs = localStorage.getItem("eventLogs");
    return storedLogs ? JSON.parse(storedLogs) : [];
  });

  // Save logs to localStorage whenever the logs state changes
  useEffect(() => {
    localStorage.setItem("eventLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = (action) => {
    const timestamp = new Date().toLocaleString();
    const newLog = { id: Date.now(), action, time: timestamp };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};
