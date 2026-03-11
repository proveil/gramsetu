import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createScheme, deleteScheme, getAllSchemes, getSchemeById, updateScheme } from "../controllers/GScheme.controller.js";
import { uploadSingle } from "../middleware/fileUpload.js";

const router = express.Router();

// ✅ Create (Admin Only)
router.post(
  "/create",
  verifyToken,
  uploadSingle.single("file"),
  createScheme
);

// ✅ View All (Public)
router.get("/all", getAllSchemes);

// ✅ View Specific (Public)
router.get("/:id", getSchemeById);

// ✅ Update (Admin Only)
router.put(
  "/:id",
  verifyToken,
  uploadSingle.single("file"),
  updateScheme
);

// ✅ Delete (Admin Only)
router.delete("/:id", verifyToken, deleteScheme);

export default router;