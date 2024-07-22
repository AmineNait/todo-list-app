import mongoose from "mongoose";
import Todo, { ITodo } from "./src/models/todo";
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement

const seedTodos = async () => {
  try {
    // Connectez-vous à MongoDB
    const mongoUri = process.env.MONGODB_URI as string; // Utilisez la bonne variable
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri);

    // Supprimez tous les enregistrements existants
    await Todo.deleteMany({});

    // Créez des enregistrements de test
    const todos: Partial<ITodo>[] = [];
    for (let i = 1; i <= 50; i++) {
      todos.push({
        title: `Todo ${i}`,
        description: `Description for Todo ${i}`,
        completed: false,
      });
    }

    // Insérez les enregistrements dans la base de données
    await Todo.insertMany(todos);

    console.log("Seed data inserted");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    // Fermez la connexion à la base de données
    await mongoose.connection.close();
  }
};

seedTodos();
