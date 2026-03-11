import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createEmergency,
  getAllEmergency,
  getEmergencyById,
  deleteEmergency,
  updateEmergency,
} from "../controllers/emergency.controller.js";

const router = express.Router();

// Create (Admin)
router.post("/create", verifyToken, createEmergency);

// Get all services (Public)
router.get("/all", getAllEmergency);

// Get single service (Public)
router.get("/:id", getEmergencyById);

// Update (Admin)
router.put("/:id", verifyToken, updateEmergency);

// Delete (Admin)
router.delete("/:id", verifyToken, deleteEmergency);

export default router;