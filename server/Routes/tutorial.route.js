import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadSingle } from "../middleware/fileUpload.js";

import {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
} from "../controllers/tutorial.controller.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  uploadSingle.single("file"),
  createTutorial
);

router.get("/all", getAllTutorials);

router.get("/:id", getTutorialById);

router.put(
  "/:id",
  verifyToken,
  uploadSingle.single("file"),
  updateTutorial
);

router.delete("/:id", verifyToken, deleteTutorial);

export default router;