import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'
import { Post } from "./Post";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryColumn({ length: 100, unique: true, nullable: false })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    @IsNotEmpty()
    firstName: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    @IsNotEmpty()
    lastName: string;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @Matches(/^[a-z0-9\-_!@#$%]{5,20}$/i, { message: 'incorrect Password' })
    password: string

    @OneToMany(type => Post, (post) => post.user)
    posts: Post[];
}
