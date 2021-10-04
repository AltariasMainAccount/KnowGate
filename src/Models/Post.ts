import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PostComment } from "./PostComment";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('number')
    creator!: number;

    @Column({
        length: 100
    })
    title!: string;

    @Column("text")
    content!: string;

    @Column('text')
    repositoryUrl!: string;

    @OneToMany(type => PostComment, postComment => postComment.belongsToPost)
    comments?: PostComment[];
}