import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/todos", auth, getTodos);
router.post("/todos", auth, createTodo);
router.put("/todos/:id", auth, updateTodo);
router.delete("/todos/:id", auth, deleteTodo);

export default router;
