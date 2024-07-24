import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import axiosInstance from "../../axiosInstance";

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  onUpdate: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  description,
  completed,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/todos/${id}`, {
        title: newTitle,
        description: newDescription,
        completed,
      });
      setIsEditing(false);
      onUpdate(); // Ajoutez un point d'arrêt ici pour vérifier si onUpdate() est appelé
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      onDelete(); // Ajoutez un point d'arrêt ici pour vérifier si onDelete() est appelé
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(title);
    setNewDescription(description);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        backgroundColor: completed ? "#d4edda" : "#f0f0f0",
        maxWidth: "100%", // Ensure the card takes full width
      }}
    >
      <CardContent>
        {isEditing ? (
          <Box>
            <TextField
              variant="outlined"
              label="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              label="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={handleUpdate}
                color="primary"
                variant="contained"
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                color="secondary"
                variant="outlined"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {completed ? "Completed" : "Incomplete"}
            </Typography>
          </>
        )}
      </CardContent>
      {!isEditing && (
        <CardActions>
          <Button onClick={() => setIsEditing(true)} color="primary">
            Edit
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default TodoItem;
