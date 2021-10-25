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
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

export default router;