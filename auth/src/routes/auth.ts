import { Router } from "express";
import authController from "../controllers/auth.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/validate", authController.validate);

export default router;
