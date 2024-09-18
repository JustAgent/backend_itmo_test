import { Request, Response, NextFunction } from "express";
import { channel, requestQueue } from "../rabbitmq/connect.js";
import crypto from "crypto";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const correlationId = crypto.randomUUID();

    const q = await channel.assertQueue(`${token}-${correlationId}`, { exclusive: true });

    channel.sendToQueue(requestQueue, Buffer.from(token), {
      correlationId: correlationId,
      replyTo: q.queue,
    });

    channel.consume(
      q.queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          console.log("Response", msg.content.toString());
          const response = JSON.parse(msg.content.toString());

          if (response.valid) {
            // @ts-ignore
            req.user = response.user;
            next();
          } else {
            res.status(401).json({ message: "Invalid token" });
          }
          channel.cancel(q.queue);
        }
      },
      { noAck: true }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

export default authMiddleware;
