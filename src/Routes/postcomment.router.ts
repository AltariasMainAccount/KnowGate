import express from "express";
import PostCommentController from "../Controllers/postcomment.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new PostCommentController();
  const response = await controller.getPostComments();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new PostCommentController();
  const response = await controller.createPostComment(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new PostCommentController();
  const response = await controller.getPostComment(req.params.id);
  if (!response) {
    return res.status(404).send({ message: "No post comment found" });
  }
  return res.send(response);
});

router.put("/:id", async (req, res) => {
  const controller = new PostCommentController();
  const response = await controller.updatePostComment(req.params.id, req.body);
  if (!response) {
    return res.status(404).send({ message: "No post comment found" });
  }
  return res.send(response);  
});

router.delete("/:id", async (req, res) => {
  const controller = new PostCommentController();
  const response = await controller.deletePostComment(req.params.id);
  if (!response) {
    return res.status(404).send({ message: "No post comment found" });
  }
  return res.send(response);  
});

export default router;