import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";
import { Post } from "./Post";

@Entity()
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
    
    @OneToMany(() => Post, post => post.creator)
    posts?: Post[];
}