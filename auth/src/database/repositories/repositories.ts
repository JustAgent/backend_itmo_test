import { PostgresDataSource } from "../db.js";
import { Users } from "../entities/Users.js";

export const userRepository = PostgresDataSource.getRepository(Users);
