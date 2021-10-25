import express from "express";
import PingController from "../Controllers/ping.controller";
import PostRouter from "./post.router";
import ProfileRouter from "./profile.router";
import PostCommentRouter from "./postcomment.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/profiles", ProfileRouter);
router.use("/posts", PostRouter);
router.use("/postcomments", PostCommentRouter);

export default router;