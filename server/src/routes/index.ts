import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import booksRouter from "./book.js";
import exchangeRequestRouter from "./exchange.js";

const apiVersion = "/api/v1";

const router = Router();

router.use(authMiddleware);
router.use(`${apiVersion}/books`, booksRouter);
router.use(`${apiVersion}/exchange`, exchangeRequestRouter);

router.use("*", (_, res) => {
  res.status(404).json("Endpoint not found");
});

export default router;
