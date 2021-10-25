import { connection, Post, PostComment } from "../Server";
import { Request, Response } from 'express';

class PostCommentController {
    constructor() {}
    public findAll (req: Request, res: Response) {
        connection.then(async connection => {
            const comments: PostComment[] = await connection.manager.find(PostComment);
            res.json(comments);
        }).catch(error => {
            console.error("Error ", error);
            res.json(error);
        })
    };
    
    public find (req: Request, res: Response) {
        connection.then(async connection => {
            const gotComment: PostComment | String = await connection.manager.findOne(PostComment, req.params.commentId) || '';
            if (gotComment instanceof String) { res.json("{ 'Error': 'Element not found' }") }
            else { res.json(gotComment); }
        }).catch(error => {
            console.error("Error ", error);
            res.json(error);        
        })
    };
    
    public create (req: Request, res: Response) {
            connection.then(async connection => {
            let requestComment = req.body;             
            let assocPost: Post | String = await connection.manager.findOne(Post, req.params.postId) || '';
    
            if (assocPost instanceof String) { res.json("{ 'Error': 'Element 'assocPost' not found' }") }
            else {
                let comment = new PostComment();
                comment.content = requestComment.content;
                comment.rating = requestComment.rating;
                comment.belongsToPost = assocPost.id;
    
                await connection.manager.save(comment);
                res.json({message: "Successfully Saved."})
            }
        }).catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    };
    
    public update (req: Request, res: Response) {
        connection.then(async connection => {                
            let comment: PostComment | String = await connection.manager.findOne(PostComment, req.params.commentId) || '';
            if (comment instanceof String) { res.json("{ 'Error': 'Element not found' }") }
            else {
                let requestComment = req.body;
                // Change the comment           
                comment.content = requestComment.content;
                comment.rating = requestComment.rating;
                await connection.manager.save(comment);
                res.json({message: "Successfully Updated."});
            }
        }).catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    };
    
    public remove (req: Request, res: Response) {
        connection.then(async connection => {
            let comment: PostComment | String = await connection.manager.findOne(PostComment, req.params.commentId) || '';
    
            if (comment instanceof String) { res.json("{ 'Error': 'Element 'comment' not found' }") }
            else {
                await connection.manager.remove(comment);                
                res.json({message: "Successfully Removed."});
            }
        })
        .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    };
}

export { PostCommentController };