import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'
import { Post } from "./Post";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    firstName: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    lastName: string;

    @Column({ length: 100, unique: true, nullable: false })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    //@IsUserAlreadyExist({ message: 'Email $value already exists.' })

    @Column({ nullable: false, select: false })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @Matches(/^[a-z0-9\-_!@#$%]{5,20}$/i, { message: 'incorrect Password' })
    password: string

    @OneToMany(type => Post, (post) => post.user)
    posts: Post[];
}
