import { Router } from "express";
import usersRouter from "./users.js";
import authRouter from "./auth.js";
import authMiddleware from "../middlewares/auth.js";

const apiVersion = "/api/v1";

const router = Router();

router.use(`${apiVersion}/auth`, authRouter);
router.use(`${apiVersion}/users`, authMiddleware, usersRouter);

router.use("*", (_, res) => {
  res.status(404).json("Endpoint not found");
});

export default router;
