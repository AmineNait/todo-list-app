import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import axiosInstance from "../../axiosInstance";

interface AddTodoProps {
  onAdd: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    try {
      await axiosInstance.post("/todos", {
        title,
        description,
        completed: false,
      });
      setTitle("");
      setDescription("");
      onAdd();
    } catch (err) {
      console.error("Add todo failed", err);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" flexDirection="column">
          <TextField
            variant="outlined"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={handleAddTodo} color="primary" variant="contained">
          Add Todo
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddTodo;
