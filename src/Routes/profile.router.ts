import express from "express";
import ProfileController from "../Controllers/profile.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ProfileController();
  const response = await controller.getProfiles();
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ProfileController();
  const response = await controller.getProfile(req.params.id);
  if (!response) return res.status(404).send({ message: "No profile found" });
  return res.send(response);
});

router.put("/:id", async (req, res) => {
  const controller = new ProfileController();
  const response = await controller.updateProfile(req.params.id, req.body);
  if (!response) return res.status(404).send({ message: "No profile found" });
  return res.send(response);  
});

router.delete("/:id", async (req, res) => {
  /*
  const controller = new ProfileController();
  const response = await controller.deleteProfile(req.params.id);
  if (!response) res.status(404).send({ message: "No profile found" });
  return res.send(response);  
  */

  return res.send({ message: "Profiles cannot be deleted from the API due to Foreign Key Constraints." })
});


export default router;