import { bookRepository } from "../database/repositories/repositories.js";

const bookService = {
  create: async (title: string, author: string, userId: number) => {
    const book = bookRepository.create({ title, author, owner: userId });
    return await bookRepository.save(book);
  },

  list: async () => {
    return await bookRepository.find({ relations: ["owner"] });
  },
};

export default bookService;
