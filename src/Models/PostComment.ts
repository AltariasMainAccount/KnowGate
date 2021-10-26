import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Post";

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text",
  })
  content!: string;

  @Column({
    type: "int"
  })
  rating!: number;

  @Column({ nullable: true })
  profileId!: number;
  @ManyToOne((_type) => Profile, (prof: Profile) => prof.comments)
  @JoinColumn()
  profile!: Profile;

  @Column({ nullable: true })
  postId!: number;
  @ManyToOne((_type) => Post, (post: Post) => post.comments)
  @JoinColumn()
  post!: Post;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}