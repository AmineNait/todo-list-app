import { useContext, useEffect } from "react";
import axios from "axios";
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

    fetchTodos();
  }, [page, setTodos, setLoading, setError, setTotalPages]);
};

export default useFetchTodos;
