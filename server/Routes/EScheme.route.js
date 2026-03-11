import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadSingle } from "../middleware/fileUpload.js";

import {
  createEScheme,
  deleteEScheme,
  getAllESchemes,
  getESchemeById,
  updateEScheme,
} from "../controllers/escheme.controller.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  uploadSingle.single("file"),
  createEScheme
);

router.get("/all", verifyToken, getAllESchemes);

router.get("/:id", getESchemeById);

router.put(
  "/:id",
  verifyToken,
  uploadSingle.single("file"),
  updateEScheme
);

router.delete("/:id", verifyToken, deleteEScheme);

export default router;