import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const defaultValues = {
  title: "",
  description: ""
};

const TaskForm = ({ onSubmit, editTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues
  });

  useEffect(() => {
    if (editTask) {
      setValue("title", editTask.title);
      setValue("description", editTask.description || "");
    } else {
      reset(defaultValues);
    }
  }, [editTask, reset, setValue]);

  const submitTask = (data) => {
    const newTask = {
      id: editTask ? editTask.id : uuidv4(),
      title: data.title.trim(),
      description: data.description?.trim() || "",
      completed: editTask ? editTask.completed : false,
      createdAt: editTask ? editTask.createdAt : new Date().toISOString(),
      completedAt: editTask ? editTask.completedAt || null : null
    };
    onSubmit(newTask);
    reset(defaultValues);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submitTask)}
      sx={{ mb: { xs: 0, md: 2 } }}
    >
      <Stack spacing={1.5}>
        <TextField
          fullWidth
          size="small"
          label="Add a task"
          placeholder="Type and press enter..."
          {...register("title", { required: "Task is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          fullWidth
          multiline
          minRows={2}
          size="small"
          label="Notes (optional)"
          placeholder="Any extra details you want to remember"
          {...register("description")}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editTask ? "Update task" : "Add task"}
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;
