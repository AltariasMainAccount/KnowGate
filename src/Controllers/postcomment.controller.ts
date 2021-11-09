import { Get, Route, Tags, Post as PostMethod, Body, Path, Put, Delete } from "tsoa";
import { DeleteResult } from "typeorm";
import { PostComment } from "../Models/ModelLoader";
import {
  createPostComment,
  getPostComments,
  IPostCommentPayload,
  getPostComment,
  updatePostComment,
  deletePostComment
} from "../Repositories/postcomment.repository";

@Route("postcomments")
@Tags("PostComment")
export default class PostCommentController {
  @Get("/")
  public async getPostComments(): Promise<Array<PostComment>> {
    return getPostComments();
  }

  @PostMethod("/")
  public async createPostComment(@Body() body: IPostCommentPayload): Promise<PostComment> {
    return createPostComment(body);
  }

  @Get("/:id")
  public async getPostComment(@Path() id: string): Promise<PostComment | null | undefined> {
    return getPostComment(Number(id));
  }

  @Put("/:id")
  public async updatePostComment(@Path() id: string, @Body() body: IPostCommentPayload): Promise<PostComment | null | undefined> {
    return updatePostComment(Number(id), body);
  }

  @Delete("/:id")
  public async deletePostComment(@Path() id: string): Promise<DeleteResult | null | undefined> {
    return deletePostComment(Number(id));
  }
}