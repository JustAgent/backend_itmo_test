import { userRepository } from "../database/repositories/repositories.js";
import bcrypt from "bcrypt";

const usersService = {
  get: async (idOrEmail: string) => {
    try {
      const id = parseInt(idOrEmail, 10);

      if (!isNaN(id)) {
        return await userRepository.findOneBy({ id });
      } else {
        return await userRepository.findOneBy({ email: idOrEmail });
      }
    } catch (error) {
      throw new Error("Error fetching user");
    }
  },

  create: async (userData: { email: string; password: string }) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = userRepository.create({
        email: userData.email,
        password: hashedPassword,
      });
      return await userRepository.save(user);
    } catch (error) {
      throw new Error("Error creating user");
    }
  },

  update: async (id: number, updateData: { email?: string; password?: string }) => {
    try {
      const user = await userRepository.findOneBy({ id });
      if (!user) return null;

      user.email = updateData.email || user.email;
      user.password = updateData.password || user.password;

      return await userRepository.save(user);
    } catch (error) {
      throw new Error("Error updating user");
    }
  },

  delete: async (id: number) => {
    try {
      const result = await userRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      throw new Error("Error deleting user");
    }
  },
};

export default usersService;
