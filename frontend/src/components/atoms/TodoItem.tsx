import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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
    await axios.put(`/api/todos/${id}`, {
      title: newTitle,
      description: newDescription,
      completed,
    });
    setIsEditing(false);
    onUpdate();
  };

  const handleDelete = async () => {
    await axios.delete(`/api/todos/${id}`);
    onDelete();
  };

  return (
    <StyledTodoItem>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>{completed ? "Completed" : "Incomplete"}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </StyledTodoItem>
  );
};

const StyledTodoItem = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
  border-radius: 4px;

  input {
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-right: 8px;
    padding: 8px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }

  button:last-child {
    background-color: #dc3545;
  }
`;

export default TodoItem;
