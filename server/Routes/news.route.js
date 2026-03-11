import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {  uploadSingle } from "../middleware/fileUpload.js";
import { createNews, deleteNews, getAllNews, getNewsById, updateNews } from "../controllers/news.controller.js";

const router = express.Router();
router.post(
  "/create",
  verifyToken,
  uploadSingle.single("file"),
  createNews
);
router.get("/all",verifyToken,getAllNews);
router.get("/:id", getNewsById);
router.delete("/:id", verifyToken, deleteNews);

router.put(
  "/:id",
  verifyToken,
  uploadSingle.single("file"),
  updateNews
);

export default router;