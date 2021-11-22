import express from "express";
import PostController from "../Controllers/post.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new PostController();
  const response = await controller.getPosts();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new PostController();
  const response = await controller.createPost(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new PostController();
  const response = await controller.getPost(req.params.id);
  if (!response) {
    return res.status(404).send({ message: "No post found" });
  }
  return res.send(response);
});

router.put("/:id", async (req, res) => {
  const controller = new PostController();
  const response = await controller.updatePost(req.params.id, req.body);
  if (!response) {
    return res.status(404).send({ message: "No post found" });
  }
  return res.send(response);  
});

router.delete("/:id", async (req, res) => {
  const controller = new PostController();
  const response = await controller.deletePost(req.params.id);
  if (!response) {
    return res.status(404).send({ message: "No post found" });
  }
  return res.send(response);  
});

export default router;