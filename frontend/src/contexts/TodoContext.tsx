import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "../axiosInstance";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  fetchTodos: (page: number) => void;
  setPage: (page: number) => void;
  setTodos: (todos: Todo[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotalPages: (totalPages: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchTodos = async (page: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/todos?page=${page}&limit=3`);
      setTodos(response.data.todos || []);
      setTotalPages(response.data.pages);
      setError(null);
    } catch (err) {
      const error = err as Error;
      if (error.message === "Invalid token") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setError("Failed to fetch todos");
      }
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

export { TodoContext };
