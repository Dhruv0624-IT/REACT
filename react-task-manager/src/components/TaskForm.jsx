import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const TaskForm = ({ onSubmit, editTask }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (editTask) {
      setValue("title", editTask.title);
      setValue("description", editTask.description);
    }
  }, [editTask, setValue]);

  const submitTask = (data) => {
    const newTask = {
      id: editTask ? editTask.id : uuidv4(),
      title: data.title,
      description: data.description,
      completed: editTask ? editTask.completed : false,
      createdAt: editTask ? editTask.createdAt : new Date().toISOString(),
    };
    onSubmit(newTask);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitTask)} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Task Title"
        {...register("title", { required: true })}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        label="Description"
        rows={3}
        {...register("description")}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        {editTask ? "Update Task" : "Add Task"}
      </Button>
    </Box>
  );
};

export default TaskForm;
