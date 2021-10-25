import { Application, Request, Response } from "express";

import { app } from "../Server"

import { PostController } from "../Controllers/PostController";
import { PostCommentController } from "../Controllers/PostCommentController";
import { ProfileController } from "../Controllers/ProfileController"

class Routes {    
    private postControl: PostController;    
    private commentControl: PostCommentController;
    private profileControl: ProfileController;


    constructor() {
        this.postControl = new PostController();
        this.commentControl = new PostCommentController();
        this.profileControl = new ProfileController();
    }    
    
    public routes(app: Application): void {
        /*
         * This section of the routes handles the web routes (the routes you can access with your browser) 
         */
        
        app.route('/').get((request: Request, response: Response) => {
            response.status(200).send({
                message: "GET request successfully."
            });
        });

        /*
         * This section handles the API routes (The routes that you make requests to using something like Postman)
         */

        // following code is to handle http://localhost:3000/api/profiles request.
        app.route('/api/profiles')
            .get(this.profileControl.findAll)
            .post(this.profileControl.create);        
        // following code is to handle http://localhost:3000/api/profile/{profileId} request.
        app.route('/api/profiles/:profileId')
            .get(this.profileControl.find)
            .put(this.profileControl.update)
            .delete(this.profileControl.remove);    
        // following code is to handle http://localhost:3000/api/posts request.
        app.route('/api/posts')
            .get(this.postControl.findAll)
            .post(this.postControl.create);        
        // following code is to handle http://localhost:3000/api/posts/{profileId} request.
        app.route('/api/posts/:postId')
            .get(this.postControl.find)
            .put(this.postControl.update)
            .delete(this.postControl.remove);    
        // following code is to handle http://localhost:3000/api/comments request.
        app.route('/api/comments')
            .get(this.commentControl.findAll)
            .post(this.commentControl.create);        
        // following code is to handle http://localhost:3000/api/comments/{commentId} request.
        app.route('/api/comments/:commentId')
            .get(this.commentControl.find)
            .put(this.commentControl.update)
            .delete(this.commentControl.remove);    
    }     
}

export { Routes };