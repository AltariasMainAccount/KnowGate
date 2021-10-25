import { connection, Post } from "../Server";
import { Request, Response } from 'express';

class PostController {
    constructor() {}
    public findAll (req: Request, res: Response) {
        connection.then(async connection => {
            const posts: Post[] = await connection.manager.find(Post);
            res.json(posts);
        }).catch(error => {
            console.error("Error ", error);
            res.json(error);
        })
    };
    
    public find (req: Request, res: Response) {
        connection.then(async connection => {
            const gotPost: Post | String = await connection.manager.findOne(Post, req.params.postId) || '';
            if (gotPost instanceof String) { res.json("{ 'Error': 'Element not found' }") }
            else { res.json(gotPost); }
        }).catch(error => {
            console.error("Error ", error);
            res.json(error);        
        })
    };
    
    public create (req: Request, res: Response) {
        connection.then(async connection => {
            let requestPost = req.body;             
            let post = new Post();
            post.title = requestPost.title;
            post.content = requestPost.content; 
            await connection.manager.save(post);
            res.json({message: "Successfully Saved."})
        }).catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    };
    
    public update (req: Request, res: Response) {
        connection.then(async connection => {                
            let post: Post | String = await connection.manager.findOne(Post, req.params.postId) || '';
            if (post instanceof String) { res.json("{ 'Error': 'Element not found' }") }
            else {
                let requestPost = req.body;
                post.title = requestPost.title;
                post.content = requestPost.content; 
                await connection.manager.save(post);
                res.json({message: "Updated."})
            }
        }).catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    };
    
    public remove (req: Request, res: Response) {
        connection.then(async connection => {
            let post: Post | String = await connection.manager.findOne(Post, req.params.postId) || '';
            if (post instanceof String) { res.json("{ 'Error': 'Element not found' }") }
            else {
                post.comments!.forEach(async comment => {
                    await connection.manager.remove(comment);
                });
                await connection.manager.remove(post);                
                res.json({message: "Successfully Removed."});
            }
            
        })
        .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    };
}

export { PostController };