import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Post } from "./Post";
import { ValidationEntity } from "./ValidationEntity";

@Entity({ name: "users" })
export class User extends ValidationEntity {
  @IsEmail()
  @IsNotEmpty()
  @PrimaryColumn()
  email: string;

  @IsNotEmpty()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @Column()
  lastName: string;

  @IsNotEmpty()
  @Matches(/^[a-z0-9\-_!@#$%]{5,20}$/i)
  @Column()
  password: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];
}
