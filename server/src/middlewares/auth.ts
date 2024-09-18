import { Request, Response, NextFunction } from "express";
import axios from "axios";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const response = await axios.post(`http://localhost:3000/api/v1/auth/validate`, { token });
    console.log(response.data);
    const user = response.data.user;

    // @ts-ignore
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
