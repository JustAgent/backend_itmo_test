import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import { DataSource } from "typeorm";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USER,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  synchronize: true, //todo
  logging: false,
  logNotifications: false,
  applicationName: "itmo_backend",
  entities: [path.join(__dirname, "entities", "*.{ts,js}")],
  migrations: [path.join(__dirname, "migrations", "*.{ts,js}")],
});
