import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express from "express";
import { PostgresDataSource } from "./database/db.js";
import router from "./routes/index.js";
import connect from "./rabbitmq/connect.js";

async function main() {
  try {
    console.log("Auth service started");
    await PostgresDataSource.initialize();
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(express.json());

    app.use(router);

    connect();

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.error(err));
