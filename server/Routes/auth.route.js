import express from "express";
import { checkAuth, forgotPassword, getDetails, login, logout, resetPassword, signup, verifyEmail } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/verify-email",verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);

router.post("/getInfo",verifyToken,getDetails);

router.get("/check-auth",verifyToken,checkAuth);

export default router;