import { Dispatch, SetStateAction } from "react";
import { Todo } from "./todo";

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  fetchTodos: (page: number) => void;
  setPage: Dispatch<SetStateAction<number>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
}
