import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../database/repositories/repositories.js";

const authService = {
  register: async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ email, password: hashedPassword });
    return await userRepository.save(user);
  },

  login: async (email: string, password: string) => {
    const user = await userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
  },
};

export default authService;
