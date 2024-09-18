import jwt from "jsonwebtoken";
import { channel, requestQueue } from "./connect.js";

export async function listen() {
  channel.consume(requestQueue, (msg) => {
    const token = msg.content.toString();
    console.log("Received token:", token);
    let response = {
      valid: false,
      user: null,
    };

    // Validate the token
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      response.valid = true;
      response.user = user;
    } catch (err) {
      response.valid = false;
    }

    // Send back the validation result to the server service
    const sent = channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
      correlationId: msg.properties.correlationId,
    });
    console.log("Response sent:", sent);

    channel.ack(msg);
  });
}
