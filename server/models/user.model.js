import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiredAt: Date
},{timestamps: true})

const User = mongoose.model("User",userSchema);

export default User;