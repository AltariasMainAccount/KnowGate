import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, BeforeInsert } from "typeorm";
import { Post } from "./Post";
import { PostComment } from "./PostComment";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { response } from 'express';

import { SECRET } from "../Server";

@Entity('Profile')
@Unique(['id', 'name'])
export class Profile {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 32,
        unique: true,
        type: "text"
    })
    name!: string;

    @Column({
        length: 64,
        select: false
    })
    password!: string; 

    @Column({
        nullable: true,
        length: 500,
        type: "text"
    })
    description!: string;
    
    @OneToMany((_type) => Post, (post: Post) => post.profile)
    posts!: Array<Post>;
  
    @OneToMany((_type) => PostComment, (comment: PostComment) => comment.profile)
    comments!: Array<Comment>;

    async setPassword (password: string) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password || this.password, salt);
    }

    generateJWT() {
        let token: string = jwt.sign({
            name: this.name,
            id: this.id
        }, `${SECRET}`, {
            expiresIn: '1h'
        })

        return token;
    }
}