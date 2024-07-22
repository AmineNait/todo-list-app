import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { Todo } from "../types/todo";
import { TodoContextType } from "../types/context";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchTodos = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/todos?page=${page}&limit=10`);
      setTodos(response.data.todos || []);
      setTotalPages(response.data.pages);
      setError(null);
    } catch (err) {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        page,
        totalPages,
        fetchTodos,
        setPage,
        setTodos,
        setLoading,
        setError,
        setTotalPages,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
