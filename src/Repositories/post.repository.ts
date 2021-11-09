import { DeleteResult, getRepository } from "typeorm";
import { Post } from '../Models/ModelLoader';

export interface IPostPayload {
    title: string;
    content: string;
    repositoryUrl: string;
    profileId: number;
}

export const getPosts = async (): Promise<Array<Post>> => {
    const postRepository = getRepository(Post);
    return postRepository.find();
};
  
export const createPost = async (payload: IPostPayload): Promise<Post> => {
    const postRepository = getRepository(Post);
    const post = new Post();
    return postRepository.save({
        ...post,
        ...payload,
    });
};
  
export const getPost = async (id: number): Promise<Post | undefined | null> => {
    const postRepository = getRepository(Post);
    const post = await postRepository.findOne({ id: id });
    if (!post) return null;
    return post;
};

/*
    API - VERSION 2 - UPDATE AND DELETE FUNCTIONALITY ADDED
*/

export const updatePost = async (id: number, updatePayload: IPostPayload): Promise<Post | undefined | null> => {
    const postRepository = getRepository(Post);
    const post = await postRepository.findOne({ id: id });
    if (!post) return null;
    return postRepository.save({
        ...post,
        ...updatePayload,
    });
};

export const deletePost = async (id: number): Promise<DeleteResult | undefined | null> => {
    const postRepository = getRepository(Post);
    const post = await postRepository.findOne({ id: id });
    if (!post) return null;
    return postRepository.delete({ id: id });
};