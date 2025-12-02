import React from "react";
import { Typography, Box } from "@mui/material";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  return (
    <Box>
      {pending.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>⏳ Pending</Typography>
          {pending.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </>
      )}
      {completed.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>✅ Completed</Typography>
          {completed.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default TaskList;
