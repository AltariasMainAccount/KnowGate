import { Get, Route, Tags, Post as PostMethod, Body, Path } from "tsoa";
import { PostComment } from "../Models/ModelLoader";
import {
  createPostComment,
  getPostComments,
  IPostCommentPayload,
  getPostComment,
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
}