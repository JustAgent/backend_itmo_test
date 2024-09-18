import { Request, Response } from "express";
import authService from "../services/auth.js";
import jwt from "jsonwebtoken";

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await authService.register(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  },
  validate: async (req: Request, res: Response) => {
    const { token } = req.body;
    console.log(token);
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ user: decoded });
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },
};

export default authController;
