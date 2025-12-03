import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

const TaskCard = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      layout
    >
      <Card
        sx={{
          my: 0.75,
          borderRadius: 2,
          border: (theme) =>
            `1px solid ${
              task.completed
                ? theme.palette.divider
                : theme.palette.mode === "dark"
                ? "rgba(148,163,184,0.5)"
                : "rgba(148,163,184,0.7)"
            }`,
          backgroundColor: (theme) =>
            task.completed
              ? theme.palette.action.hover
              : theme.palette.background.paper
        }}
      >
        <CardContent sx={{ py: 1.25, px: 1.75 }}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={1.25}>
            <Box display="flex" alignItems="flex-start" flex={1} gap={1}>
              <Checkbox
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                size="small"
                sx={{ mt: 0.3 }}
              />
              <Box flex={1}>
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    opacity: task.completed ? 0.6 : 1,
                    fontWeight: 500
                  }}
                >
                  {task.title}
                </Typography>
                {task.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.3, whiteSpace: "pre-line" }}
                  >
                    {task.description}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              {!task.completed && (
                <IconButton size="small" onClick={() => onEdit(task)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton size="small" onClick={() => onDelete(task.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;

