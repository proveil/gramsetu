import mongoose from "mongoose";
import News from "../models/news.model.js";
import User from "../models/user.model.js";
import path from "path";
import fs from "fs"


export const createNews = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description required",
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
        message: "News cover required",
      });
    }

    // ✅ Build clean relative path manually
    const coverImagePath = `storage/${req.id}/general/${req.file.filename}`;

    const news = await News.create({
      title,
      description,
      coverImage: coverImagePath,
      author: user._id,
    });

    res.status(201).json({
      success: true,
      message: "News created successfully",
      news,
    });

  } catch (error) {
    console.log(`Create-News: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate("author", "displayName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    console.log(`Get-All-News: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID",
      });
    }

    const news = await News.findById(id)
      .populate("author", "displayName email");

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      news,
    });

  } catch (error) {
    console.log(`Get-News: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // 🔥 Delete image file from storage
    const imagePath = path.join(process.cwd(), "..", news.coverImage);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await news.deleteOne();

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });

  } catch (error) {
    console.log(`Delete-News: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // Update title/description if provided
    if (title) news.title = title;
    if (description) news.description = description;

    // If new image uploaded
    if (req.file) {

      // delete old image
      const oldImagePath = path.join(process.cwd(), "..", news.coverImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      // set new image path
      news.coverImage = `storage/${req.id}/general/${req.file.filename}`;
    }

    await news.save();

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      news,
    });

  } catch (error) {
    console.log(`Update-News: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};