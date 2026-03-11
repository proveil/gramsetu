import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import { uploadSingle } from "../middleware/fileUpload.js";

const router = express.Router();

// ✅ Create Book (Admin Only)
router.post(
  "/create",
  verifyToken,
  uploadSingle.single("file"),
  createBook
);

// ✅ Get All Books (Public)
router.get("/all", getAllBooks);

// ✅ Get Book By ID (Public)
router.get("/:id", getBookById);

// ✅ Update Book (Admin Only)
router.put(
  "/:id",
  verifyToken,
  uploadSingle.single("file"),
  updateBook
);

// ✅ Delete Book (Admin Only)
router.delete("/:id", verifyToken, deleteBook);

export default router;