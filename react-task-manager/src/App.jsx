import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Switch,
  FormControlLabel,
  CssBaseline,
  Stack,
  Chip
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Theme setup
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#93c5fd" : "#2563eb"
          },
          background: {
            default: darkMode ? "#020617" : "#f3f4f6",
            paper: darkMode ? "#020617" : "#ffffff"
          }
        },
        shape: {
          borderRadius: 16
        },
        typography: {
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif'
        }
      }),
    [darkMode]
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taskList"));
    if (saved) setTasks(saved);
    const savedMode = localStorage.getItem("taskManagerDarkMode");
    if (savedMode) setDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskManagerDarkMode", String(darkMode));
  }, [darkMode]);

  const handleAddOrUpdate = (task) => {
    if (editTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      setEditTask(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const handleDelete = (id) => {
    const task = tasks.find((t) => t.id === id);
    const label = task?.title ? `"${task.title}"` : "this task";
    const confirmed = window.confirm(
      `Delete ${label}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks((current) =>
      current.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null
            }
          : t
      )
    );
  };

  const handleEdit = (task) => setEditTask(task);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "center",
          py: { xs: 2, md: 6 },
          px: { xs: 1.5, md: 2 },
          backgroundColor: theme.palette.background.default
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            my: { xs: 1.5, md: 0 },
            py: { xs: 2.5, md: 4 },
            px: { xs: 2, md: 4 },
            borderRadius: { xs: 4, md: 5 },
            boxShadow: darkMode
              ? "0 24px 70px rgba(15,23,42,0.95)"
              : "0 18px 50px rgba(15,23,42,0.14)",
            backgroundColor: theme.palette.background.paper,
            backdropFilter: { xs: "blur(26px)", md: "none" },
            border: darkMode
              ? "1px solid rgba(148,163,184,0.45)"
              : "1px solid rgba(148,163,184,0.25)",
            maxHeight: { xs: "100vh", md: "auto" },
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={1.5}
            mb={1.5}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem" }, letterSpacing: -0.3 }}
              >
                My To‑Do
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep today’s tasks in one simple list
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  size="small"
                />
              }
              label="Dark"
              sx={{
                m: 0,
                ".MuiFormControlLabel-label": { fontSize: 12 }
              }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 1.5,
              flexWrap: "wrap"
            }}
          >
            <Chip
              label={`Total • ${totalTasks}`}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 999,
                borderColor: "rgba(148,163,184,0.5)",
                backgroundColor: "rgba(248,250,252,0.9)",
                fontWeight: 500
              }}
            />
            <Chip
              label={`Completed • ${completedTasks}`}
              size="small"
              sx={{
                borderRadius: 999,
                backgroundColor: "rgba(34,197,94,0.08)",
                color: "rgb(22,163,74)",
                fontWeight: 500
              }}
            />
            <Chip
              label={`Pending • ${pendingTasks}`}
              size="small"
              sx={{
                borderRadius: 999,
                backgroundColor: "rgba(59,130,246,0.08)",
                color: "rgb(37,99,235)",
                fontWeight: 500
              }}
            />
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1.5, display: "block" }}
          >
            {totalTasks === 0
              ? "No tasks yet. Add your first one below."
              : `${pendingTasks} pending • ${completedTasks} completed`}
          </Typography>

          <Box
            sx={{
              position: { xs: "sticky", md: "static" },
              top: { xs: 0, md: "auto" },
              zIndex: 2,
              pt: { xs: 0.5, md: 0 },
              pb: { xs: 1.5, md: 0 },
              mb: { xs: 1.5, md: 2.5 },
              backgroundColor: (themeArg) =>
                themeArg.palette.mode === "dark"
                  ? "rgba(15,23,42,0.9)"
                  : "rgba(248,250,252,0.9)",
              backdropFilter: { xs: "blur(18px)", md: "none" },
              borderBottom: {
                xs: "1px solid rgba(148,163,184,0.18)",
                md: "none"
              }
            }}
          >
            <TaskForm onSubmit={handleAddOrUpdate} editTask={editTask} />
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: { xs: "auto", md: "visible" },
              pr: { xs: 0.5, md: 0 }
            }}
          >
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />

            {tasks.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 4 }}
              >
                Start small: add one thing you want to get done today.
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
