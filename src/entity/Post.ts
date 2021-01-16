import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column({ type: "varchar", length: 100})
    title: string;

    @Column({ name: 'date_create', default: () => 'NOW()' })
    date: Date

    @Column({ type: "varchar", length: 500})
    content: string;

    @ManyToOne(type => User, (user) => user.posts)
    user: User[];
}
