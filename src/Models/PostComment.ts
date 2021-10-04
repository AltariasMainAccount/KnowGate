import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostComment {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('number')
    rating!: number;

    @Column("text")
    content!: string;

    @Column('number')
    belongsToPost!: number;
}