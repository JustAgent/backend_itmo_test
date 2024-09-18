import amqplib from "amqplib";
import "dotenv/config";
import { listen } from "./auth.js";

export let connection: amqplib.Connection;
export let channel: amqplib.Channel;
export const requestQueue = "auth-req";
export default async function connect() {
  try {
    console.log("RabbitMQ connected: auth");
    connection = await amqplib.connect(process.env.AMQP);
    channel = await connection.createChannel();
    await channel.assertQueue(requestQueue);
    listen();
  } catch (error) {
    console.log(error);
  }
}
