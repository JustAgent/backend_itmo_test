import { Router } from "express";
import bookController from "../controllers/book.js";

const router = Router();

router.get("/", bookController.list);
router.post("/", bookController.create);

export default router;
