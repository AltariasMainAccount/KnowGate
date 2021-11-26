import { DeleteResult, getRepository } from "typeorm";
import { PostComment, Profile } from '../Models/ModelLoader';

export interface IPostCommentPayload {
    content: string;
    rating: number;
    profileId: number;
    postId: number;
}

export const getPostComments = async (): Promise<Array<PostComment>> => {
    const postCommentRepository = getRepository(PostComment);
    return postCommentRepository.find({ relations: ["profile"] });
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
    postComment.profile = <Profile> await postCommentRepository.createQueryBuilder().relation(PostComment, "profile").of(postComment).loadOne();
    
    return postComment;
};

/*
    API - VERSION 2 - UPDATE AND DELETE FUNCTIONALITY ADDED
*/

export const updatePostComment = async (id: number, updatePayload: IPostCommentPayload): Promise<PostComment | undefined | null> => {
    const postCommentRepository = getRepository(PostComment);
    const postComment = await postCommentRepository.findOne({ id: id });
    if (!postComment) return null;
    return postCommentRepository.save({
        ...postComment,
        ...updatePayload,
    });
};

export const deletePostComment = async (id: number): Promise<DeleteResult | undefined | null> => {
    const postCommentRepository = getRepository(PostComment);
    const postComment = await postCommentRepository.findOne({ id: id });
    if (!postComment) return null;
    return postCommentRepository.delete({ id: id });
};