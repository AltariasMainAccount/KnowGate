import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./Profile";
import { PostComment } from "./PostComment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({
    type: "text",
  })
  content!: string;

  @Column({ nullable: true })
  profileId!: number;
  @ManyToOne((_type) => Profile, (prof: Profile) => prof.posts)
  @JoinColumn()
  profile!: Profile;

  @OneToMany((_type) => Comment, (comment: PostComment) => comment.post)
  comments!: Array<Comment>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}