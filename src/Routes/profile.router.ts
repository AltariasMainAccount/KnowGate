import express from "express";
import ProfileController from "../Controllers/profile.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ProfileController();
  const response = await controller.getProfiles();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ProfileController();
  const response = await controller.createProfile(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ProfileController();
  const response = await controller.getProfile(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

export default router;