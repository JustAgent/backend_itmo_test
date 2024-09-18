import { Router } from "express";
import exchangeController from "../controllers/exchange.js";

const router = Router();

router.post("/create", exchangeController.createRequest);
router.post("/fulfill", exchangeController.fulfillRequest);
router.get("/", exchangeController.listRequests);

export default router;
