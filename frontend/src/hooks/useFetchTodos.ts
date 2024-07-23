import { useContext, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { TodoContext } from "../contexts/TodoContext";
import { TodoContextType } from "../types/context";
import { UseFetchTodosProps } from "../types/hooks";

const useFetchTodos = ({ page }: UseFetchTodosProps) => {
  const { setTodos, setLoading, setError, setTotalPages } = useContext(
    TodoContext
  ) as TodoContextType;

  useEffect(() => {
    const fetchTodos = async () => {
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

    fetchTodos();
  }, [page, setTodos, setLoading, setError, setTotalPages]);
};

export default useFetchTodos;
