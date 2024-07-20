import express, { Application } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app: Application = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api", todoRoutes);

export default app;
