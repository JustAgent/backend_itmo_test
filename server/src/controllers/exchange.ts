import { Request, Response } from "express";
import exchangeService from "../services/exchange.js";

const exchangeController = {
  createRequest: async (req: Request, res: Response) => {
    try {
      const { offeredBookId, requestedBookId } = req.body;
      if (!offeredBookId || !requestedBookId) throw new Error("Invalid body");

      // @ts-ignore
      const userId = req.user.id;
      const request = await exchangeService.createRequest(userId, offeredBookId, requestedBookId);
      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  fulfillRequest: async (req: Request, res: Response) => {
    try {
      const { requestId } = req.body;
      if (!requestId) throw new Error("Invalid body");

      // @ts-ignore
      const userId = req.user.id;
      const request = await exchangeService.fulfillRequest(requestId, userId);
      res.status(201).json(request);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  listRequests: async (req: Request, res: Response) => {
    try {
      const requests = await exchangeService.listRequests();
      res.status(200).json(requests);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default exchangeController;
