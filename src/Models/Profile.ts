import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, BeforeInsert } from "typeorm";
import { Post } from "./Post";
import { PostComment } from "./PostComment";
import * as bcrypt from 'bcrypt';

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

    @BeforeInsert()
    async setPassword(password: string) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(password || this.password, salt);
    }
}