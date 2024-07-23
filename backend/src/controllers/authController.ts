import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user"; // Assurez-vous d'importer IUser

// Génération de token JWT
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

// Contrôleur d'inscription
const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = (await User.findOne({ email })) as IUser | null;
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 8);

    // Créer un nouvel utilisateur
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Générer le token JWT
    const token = generateToken(user._id.toString());

    // Réponse avec utilisateur et token
    res.status(201).send({ user, token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).send({ error: "Registration failed" });
  }
};

// Contrôleur de connexion
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Vérifier l'utilisateur par email
    const user = (await User.findOne({ email })) as IUser | null;
    if (!user) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    // Générer le token JWT
    const token = generateToken(user._id.toString());

    // Réponse avec utilisateur et token
    res.send({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ error: "Login failed" });
  }
};

export { register, login };
