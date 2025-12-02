import React from "react";
import {
  Card, CardContent, Typography, IconButton, Checkbox, Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

const TaskCard = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card sx={{ my: 1, background: task.completed ? "#e0f7e9" : "#fff" }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
              <Box>
                <Typography variant="h6" sx={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.title}
                </Typography>
                {task.description && (
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Box>
              {!task.completed && (
                <IconButton onClick={() => onEdit(task)}>
                  <EditIcon color="warning" />
                </IconButton>
              )}
              <IconButton onClick={() => onDelete(task.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
