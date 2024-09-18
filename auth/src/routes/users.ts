import { Router } from "express";
import usersController from "../controllers/users.js";

const router = Router();

router.get("/:idOrEmail", usersController.get);
router.post("/:id", usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);

export default router;
