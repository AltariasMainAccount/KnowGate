import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Post } from "../Server";

@Entity()
export class PostComment {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('number')
    rating!: number;

    @Column("text")
    content!: string;

    @ManyToOne(() => Post, post => post.comments)
    belongsToPost!: number;
}