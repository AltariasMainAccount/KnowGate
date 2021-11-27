import express from "express";
import PingController from "../Controllers/ping.controller";
import PostRouter from "./post.router";
import ProfileRouter from "./profile.router";
import PostCommentRouter from "./postcomment.router";
import AuthRouter from "./auth.router";

const router = express.Router();

// PUBLIC Web Routes

router.get("/", async (_req, res) => {
  res.render("index");
});

router.get("/news", async (_req, res) => {
  res.render("news");
});

router.get("/about", async (_req, res) => {
  res.render("about");
});

router.get("/contact", async (_req, res) => {
  res.render("contact");
});

router.get("/login", async (_req, res) => {
  res.render("auth/login");
});

router.get("/register", async (_req, res) => {
  res.render("auth/register");
});

// PROTECTED Web Routes

router.get("/dashboard", async (_req, res) => { // Dashboard (aka HomePage)
  let auth = res.locals.user;
  
  res.render("web/dashboard", {
    name: auth.name,
    id: auth.id
  });
});

router.get("/profiles", async (_req, res) => { // View all profiles
  let auth = res.locals.user;

  res.render("web/view_all", {
    name: auth.name,
    id: auth.id
  });
});

router.get("/profiles/view/:id", async (_req, res) => { // View One Profile
  let auth = res.locals.user;
  
  res.render("web/view_one", {
    name: auth.name,
    id: auth.id
  });
});

router.get("/profiles/my", async (_req, res) => { // My Profile
  let auth = res.locals.user;
  
  res.render("web/my_profile", {
    name: auth.name,
    id: auth.id
  }); 
})

router.get("/profiles/my/edit", async (_req, res) => { // Edit My Profile
  let auth = res.locals.user;
  
  res.render("web/edit_profile", {
    name: auth.name,
    id: auth.id
  }); 
})

router.get("/posts", async (_req, res) => { // View All Posts
  let auth = res.locals.user;
  
  res.render("web/view_all", {
    name: auth.name,
    id: auth.id
  });
});

router.get("/posts/view/:id", async (_req, res) => { // View One Post
  let auth = res.locals.user;
  
  res.render("web/view_one", {
    name: auth.name,
    id: auth.id
  });
});

router.get("/posts/create", async (_req, res) => {
  let auth = res.locals.user;
  
  res.render("web/post_create", {
    name: auth.name,
    id: auth.id
  });  
})

// API Routes

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