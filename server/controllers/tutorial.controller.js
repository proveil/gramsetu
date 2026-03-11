import mongoose from "mongoose";
import Tutorial from "../models/tutorial.model.js";
import User from "../models/user.model.js";
import path from "path";
import fs from "fs";


// CREATE TUTORIAL (Admin)
export const createTutorial = async (req, res) => {
  try {
    const { title, videoID } = req.body;

    if (!title || !videoID) {
      return res.status(400).json({
        success: false,
        message: "Title and videoID are required",
      });
    }

    const user = await User.findById(req.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video cover image required",
      });
    }

    const videoCoverPath = `storage/${req.id}/general/${req.file.filename}`;

    const tutorial = await Tutorial.create({
      title,
      videoID,
      videoCover: videoCoverPath,
      author: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Tutorial created successfully",
      tutorial,
    });

  } catch (error) {
    console.log(`Create-Tutorial: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL TUTORIALS
export const getAllTutorials = async (req, res) => {
  try {

    const tutorials = await Tutorial.find()
      .populate("author", "displayName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tutorials.length,
      tutorials,
    });

  } catch (error) {
    console.log(`Get-All-Tutorials: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET SINGLE TUTORIAL
export const getTutorialById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tutorial ID",
      });
    }

    const tutorial = await Tutorial.findById(id)
      .populate("author", "displayName email");

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: "Tutorial not found",
      });
    }

    res.status(200).json({
      success: true,
      tutorial,
    });

  } catch (error) {
    console.log(`Get-Tutorial: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE TUTORIAL (Admin)
export const updateTutorial = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, videoID } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tutorial ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const tutorial = await Tutorial.findById(id);

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: "Tutorial not found",
      });
    }

    if (title) tutorial.title = title;
    if (videoID) tutorial.videoID = videoID;

    if (req.file) {

      const oldImagePath = path.join(process.cwd(), "..", tutorial.videoCover);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      tutorial.videoCover = `storage/${req.id}/general/${req.file.filename}`;
    }

    await tutorial.save();

    res.status(200).json({
      success: true,
      message: "Tutorial updated successfully",
      tutorial,
    });

  } catch (error) {
    console.log(`Update-Tutorial: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE TUTORIAL (Admin)
export const deleteTutorial = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tutorial ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const tutorial = await Tutorial.findById(id);

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: "Tutorial not found",
      });
    }

    const imagePath = path.join(process.cwd(), "..", tutorial.videoCover);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await tutorial.deleteOne();

    res.status(200).json({
      success: true,
      message: "Tutorial deleted successfully",
    });

  } catch (error) {
    console.log(`Delete-Tutorial: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};