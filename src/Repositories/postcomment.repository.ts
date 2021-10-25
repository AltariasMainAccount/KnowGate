import { getRepository } from "typeorm";
import { PostComment } from '../Models/ModelLoader';

export interface IPostCommentPayload {
    content: string;
    profileId: number;
    postCommentId: number;
}

export const getPostComments = async (): Promise<Array<PostComment>> => {
    const postCommentRepository = getRepository(PostComment);
    return postCommentRepository.find();
};
  
export const createPostComment = async (payload: IPostCommentPayload): Promise<PostComment> => {
    const postCommentRepository = getRepository(PostComment);
    const postComment = new PostComment();
    return postCommentRepository.save({
      ...postComment,
      ...payload,
    });
};
  
export const getPostComment = async (id: number): Promise<PostComment | undefined | null> => {
    const postCommentRepository = getRepository(PostComment);
    const postComment = await postCommentRepository.findOne({ id: id });
    if (!postComment) return null;
    return postComment;
};