import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Post } from "../Server";

@Entity('PostComment')
export class PostComment {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    rating!: number;

    @Column("text")
    content!: string;

    @ManyToOne(() => Post, post => post.comments)
    belongsToPost!: number;
}