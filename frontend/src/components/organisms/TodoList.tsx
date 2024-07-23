import React, { useState } from "react";
import Slider from "react-slick";
import useFetchTodos from "../../hooks/useFetchTodos";
import { useTodoContext } from "../../contexts/TodoContext";
import TodoItem from "../atoms/TodoItem";
import AddTodo from "../atoms/AddTodo";
import Pagination from "../atoms/Pagination";
import { Container, Box } from "@mui/material";

const TodoList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { todos, loading, error, totalPages, fetchTodos } = useTodoContext();

  useFetchTodos({ page });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <Container>
      <AddTodo onAdd={() => fetchTodos(page)} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && todos.length > 0 && (
        <Box sx={{ overflow: "hidden" }}>
          <Slider {...settings}>
            {todos.map((todo) => (
              <div
                key={todo._id}
                style={{ padding: "0 10px", boxSizing: "border-box" }}
              >
                <TodoItem
                  id={todo._id}
                  title={todo.title}
                  description={todo.description}
                  completed={todo.completed}
                  onUpdate={() => fetchTodos(page)}
                  onDelete={() => fetchTodos(page)}
                />
              </div>
            ))}
          </Slider>
        </Box>
      )}
      {!loading && !error && todos.length === 0 && <p>No todos available.</p>}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </Container>
  );
};

export default TodoList;
