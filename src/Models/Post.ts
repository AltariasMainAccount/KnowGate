import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PostComment } from "./PostComment";

@Entity('Post')
export class Post {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    creator!: number;

    @Column({
        length: 100
    })
    title!: string;

    @Column("text")
    content!: string;

    @Column('text')
    repositoryUrl!: string;

    @OneToMany(() => PostComment, postComment => postComment.belongsToPost)
    comments?: PostComment[];
}