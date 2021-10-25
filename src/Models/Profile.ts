import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";
import { Post } from "./Post";
import { PostComment } from "./PostComment";

@Entity('Profile')
@Unique(['id', 'name'])
export class Profile {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 32
    })
    name!: string;

    @Column({
        length: 64,
        select: false
    })
    password!: string; 

    @Column("text")
    description!: string;
    
    @OneToMany((_type) => Post, (post: Post) => post.profile)
    posts!: Array<Post>;
  
    @OneToMany((_type) => PostComment, (comment: PostComment) => comment.profile)
    comments!: Array<Comment>;
}