import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendResetEmail, sendResetEmailNotice, sendVerificationEmail, sendVerifiedWelcomeEmail } from "../utils/sendEmail.js";

export const signup = async (req, res) => {
    const { displayName, email, address, pincode, password } = req.body;
    try {
        if (!displayName || !email || !address || !pincode || !password) return res.status(400).json({ success: false, message: "Please fill in all details" });
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) return res.status(400).json({ success: false, message: "Account already exist" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            displayName,
            email,
            address,
            pincode,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000
        })
        await user.save();

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(email, user.verificationToken);

        res.status(201).json({
            success: true,
            message: "Account created!",
            user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(`Signup: ${error.message}`);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV == "production"
        })
        res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(`Logout: ${error.message}`);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ success: false, message: "All fields required!" });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Invalid user!" });
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ success: false, message: "Invalid password!" });
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();

        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(`Login: ${error.message}`);
    }
}

export const getDetails = async (req, res) => {
    const id = req.id;
    try {
        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ success: false, message: "user not found" });
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(`Get-Details: ${error.message}`);
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiredAt: {
                $gt: Date.now()
            }
        });
        if (!user) return res.status(404).json({ success: false, message: "Invalid or expired verification code" });
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiredAt = undefined;

        await user.save();

        await sendVerifiedWelcomeEmail(user.email, user.displayName);
        res.status(200).json({
            success: true,
            message: "Account verified!",
            user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(`VerifyEmail: ${error.message}`);
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) return res.status(400).json({ success: false, message: "Email required" });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "user not found" });
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpiredAt = Date.now() + 1 * 60 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiredAt = resetPasswordExpiredAt;

        await user.save();
        await sendResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        })
    } catch (error) {
        console.log(`Forgot-Password: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiredAt: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired reset token" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiredAt = undefined;

        await user.save();

        await sendResetEmailNotice(user.email);

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });
    } catch (error) {
        console.log(`Reset-Password: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const checkAuth = async(req,res)=>{
    try {
        const user = await User.findById(req.id).select("-password");
        if(!user) return res.status(404).json({success: false, message: "user not found"});
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(`Check Auth: ${error.message}`);
    }
}

