import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

interface AddTodoProps {
  onAdd: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    await axios.post("/api/todos", {
      title,
      description,
      completed: false,
    });
    setTitle("");
    setDescription("");
    onAdd();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
    </Box>
  );
};

export default AddTodo;
