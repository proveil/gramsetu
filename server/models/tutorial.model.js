import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    videoID: {
      type: String,
      required: true,
      trim: true,
      match: [/^[a-zA-Z0-9_-]{11}$/, "Must be a valid YouTube video ID"]
    },
    videoCover: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

export default Tutorial;