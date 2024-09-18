import { Request, Response } from "express";
import bookService from "../services/book.js";

const bookController = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, author } = req.body;
      // @ts-ignore
      const userId = req.user.id;
      console.log(userId);
      const book = await bookService.create(title, author, userId);
      res.status(201).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  list: async (req: Request, res: Response) => {
    try {
      const books = await bookService.list();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default bookController;
