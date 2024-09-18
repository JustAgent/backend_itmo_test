import { PostgresDataSource } from "../db.js";
import { Books } from "../entities/Books.js";
import { ExchangeRequests } from "../entities/ExchangeRequests.js";

export const bookRepository = PostgresDataSource.getRepository(Books);
export const exchangeRequestRepository = PostgresDataSource.getRepository(ExchangeRequests);
