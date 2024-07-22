import React from "react";
import TodoList from "../components/organisms/TodoList";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
};

export default HomePage;
