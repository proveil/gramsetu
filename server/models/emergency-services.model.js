import mongoose from "mongoose";

const emergencyServicesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        number: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Emergency = mongoose.model("Emergency", emergencyServicesSchema);

export default Emergency;