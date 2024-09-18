import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Books } from "./Books.js";

@Entity()
export class ExchangeRequests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  creator: number;

  @ManyToOne(() => Books)
  requestedBook: Books;

  @ManyToOne(() => Books)
  offeredBook: Books;

  @Column({ type: "varchar", default: "pending" })
  status: string;
}
