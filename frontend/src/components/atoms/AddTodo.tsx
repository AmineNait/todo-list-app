import React, { useState } from "react";
import styled from "styled-components";
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
    <StyledAddTodo>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </StyledAddTodo>
  );
};

const StyledAddTodo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  input {
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px;
    border: none;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }
`;

export default AddTodo;
