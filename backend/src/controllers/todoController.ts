import { Request, Response } from "express";
import Todo, { ITodo } from "../models/todo";
import { handleError } from "../utils/errorHandler";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const todos: ITodo[] = await Todo.find().skip(skip).limit(limit);
    const total = await Todo.countDocuments();

    res
      .status(200)
      .json({ todos, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: handleError(error) });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTodo: ITodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    });
    const savedTodo: ITodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: handleError(error) });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: handleError(error) });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: handleError(error) });
  }
};
