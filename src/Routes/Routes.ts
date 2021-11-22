import express from "express";
import PingController from "../Controllers/ping.controller";
import PostRouter from "./post.router";
import ProfileRouter from "./profile.router";
import PostCommentRouter from "./postcomment.router";
import AuthRouter from "./auth.router";

const router = express.Router();

router.get("/", async (_req, res) => {
  res.render("index");
})

router.get("/api/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/api/profiles", ProfileRouter);
router.use("/api/posts", PostRouter);
router.use("/api/postcomments", PostCommentRouter);

router.use("/api/auth", AuthRouter);

export default router;