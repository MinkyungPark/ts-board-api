import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column({ name: "user_id" })
    userId: string;

    @ManyToOne(type => User, (user) => user.email, {
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "user_id"})
    user: User;

    @Column({ type: "varchar", length: 100})
    title: string;

    @Column({ name: "date_create", default: () => 'NOW()' })
    date: Date

    @Column({ type: "varchar", length: 500})
    content: string;
}
