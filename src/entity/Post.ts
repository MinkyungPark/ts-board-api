import { IsNotEmpty, isNotEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { ValidationEntity } from "./ValidationEntity";

@Entity({ name: "posts" })
export class Post extends ValidationEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne((type) => User, (user) => user.email, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @IsNotEmpty()
  @Column()
  title: string;

  @Column({ name: "date_create", default: () => "NOW()" })
  date: Date;

  @IsNotEmpty()
  @Column()
  content: string;
}
