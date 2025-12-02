import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
  CssBaseline
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Theme setup
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        primary: {
          main: darkMode ? "#90caf9" : "#1976d2"
        },
      }
    }), [darkMode]
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taskList"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdate = (task) => {
    if (editTask) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setEditTask(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleEdit = (task) => setEditTask(task);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Typography variant="h3" align="center" gutterBottom>
          📝 TaskManager
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Your smart daily planner
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          }
          label="Dark Mode"
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        />
        <Divider sx={{ my: 3 }} />
        <TaskForm onSubmit={handleAddOrUpdate} editTask={editTask} />
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
