import { Request, Response } from "express";
import usersService from "../services/users.js";

const usersController = {
  get: async (req: Request, res: Response) => {
    try {
      const idOrEmail = req.params.idOrEmail;
      const user = await usersService.get(idOrEmail);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      const user = await usersService.create({ email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { email, password } = req.body;
      const updatedUser = await usersService.update(id, { email, password });
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await usersService.delete(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default usersController;
