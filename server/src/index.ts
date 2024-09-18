import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express from "express";
import { PostgresDataSource } from "./database/db.js";
import router from "./routes/index.js";

async function main() {
  try {
    console.log("Server started");
    await PostgresDataSource.initialize();
    const app = express();
    const port = process.env.PORT || 3001;

    app.use(cors());
    app.use(express.json());

    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.error(err));
