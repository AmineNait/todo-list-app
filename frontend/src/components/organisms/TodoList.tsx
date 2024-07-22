import React, { useState } from "react";
import useFetchTodos from "../../hooks/useFetchTodos";
import { useTodoContext } from "../../contexts/TodoContext";
import TodoItem from "../atoms/TodoItem";
import AddTodo from "../atoms/AddTodo";
import Pagination from "../atoms/Pagination";

const TodoList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { todos, loading, error, totalPages, fetchTodos } = useTodoContext();

  useFetchTodos({ page });

  return (
    <div>
      <AddTodo onAdd={() => fetchTodos(page)} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading &&
        !error &&
        todos.length > 0 &&
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            id={todo._id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            onUpdate={() => fetchTodos(page)}
            onDelete={() => fetchTodos(page)}
          />
        ))}
      {!loading && !error && todos.length === 0 && <p>No todos available.</p>}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default TodoList;
