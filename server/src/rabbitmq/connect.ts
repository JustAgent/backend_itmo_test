import amqplib from "amqplib";
import "dotenv/config";

export let connection: amqplib.Connection;
export let channel: amqplib.Channel;
export const requestQueue = "auth-req";

const RECONNECT_INTERVAL = 2000; // 5 seconds
const MAX_RECONNECT_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

async function reconnect() {
  let startTime = Date.now();

  while (Date.now() - startTime < MAX_RECONNECT_TIME) {
    try {
      console.log("Attempting to connect to RabbitMQ...");
      connection = await amqplib.connect(process.env.AMQP);
      channel = await connection.createChannel();
      await channel.assertQueue(requestQueue);
      console.log("RabbitMQ connected: server");
      return; // Exit loop if connection is successful
    } catch (error) {
      console.log("Connection failed. Retrying in 5 seconds...");
      console.error(error);
      await new Promise((resolve) => setTimeout(resolve, RECONNECT_INTERVAL));
    }
  }

  console.log("Failed to connect to RabbitMQ after 10 minutes. Exiting...");
}

export default reconnect;
