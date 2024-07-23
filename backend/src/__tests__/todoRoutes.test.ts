import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Todo from "../models/todo";

let mongoServer: MongoMemoryServer;
let token: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri);

  const userResponse = await request(app).post("/api/register").send({
    email: "test@example.com",
    password: "password",
  });

  token = userResponse.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Todo.deleteMany({});
});

describe("Todo API", () => {
  it("should create a new todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Todo",
        description: "This is a test todo",
        completed: false,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Todo");
  });

  it("should fetch all todos", async () => {
    await Todo.create([
      {
        title: "First Todo",
        description: "First todo description",
        completed: false,
      },
      {
        title: "Second Todo",
        description: "Second todo description",
        completed: false,
      },
    ]);

    const response = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.todos).toHaveLength(2);
  });

  it("should update a todo", async () => {
    const todo = await Todo.create({
      title: "Initial Todo",
      description: "Initial todo description",
      completed: false,
    });

    const response = await request(app)
      .put(`/api/todos/${todo._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Todo",
        description: "Updated todo description",
        completed: true,
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Todo");
    expect(response.body.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    const todo = await Todo.create({
      title: "Todo to delete",
      description: "Todo to delete description",
      completed: false,
    });

    const response = await request(app)
      .delete(`/api/todos/${todo._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Todo deleted successfully");
  });
});
