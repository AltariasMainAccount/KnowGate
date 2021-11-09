import { Get, Route, Tags, Post as PostMethod, Body, Path, Put, Delete } from "tsoa";
import { DeleteResult } from "typeorm";
import { Post } from "../Models/ModelLoader";
import {
  createPost,
  getPosts,
  IPostPayload,
  getPost,
  updatePost,
  deletePost
} from "../Repositories/post.repository";

@Route("posts")
@Tags("Post")
export default class PostController {
  @Get("/")
  public async getPosts(): Promise<Array<Post>> {
    return getPosts();
  }

  @PostMethod("/")
  public async createPost(@Body() body: IPostPayload): Promise<Post> {
    return createPost(body);
  }

  @Get("/:id")
  public async getPost(@Path() id: string): Promise<Post | null | undefined> {
    return getPost(Number(id));
  }

  @Put("/:id")
  public async updatePost(@Path() id: string, @Body() body: IPostPayload): Promise<Post | null | undefined> {
    return updatePost(Number(id), body);
  }

  @Delete("/:id")
  public async deletePost(@Path() id: string): Promise<DeleteResult | null | undefined> {
    return deletePost(Number(id));
  }
}