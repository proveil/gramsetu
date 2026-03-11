import mongoose from "mongoose";
import EScheme from "../models/eSchemes.model.js";
import User from "../models/user.model.js";
import path from "path";
import fs from "fs";



export const createEScheme = async (req, res) => {
  try {

    const { title, description, schemeLink, pdfLink, duration } = req.body;

    if (!title || !description || !schemeLink || !pdfLink || !duration) {
      return res.status(400).json({
        success: false,
        message: "Title, description, scheme link, pdf link and duration required",
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
        message: "Scheme cover image required",
      });
    }

    // build clean storage path
    const coverImagePath = `storage/${req.id}/general/${req.file.filename}`;

    const scheme = await EScheme.create({
      title,
      description,
      schemeLink,
      pdfLink,
      duration,
      coverImage: coverImagePath,
      author: user._id,
    });

    res.status(201).json({
      success: true,
      message: "External scheme created successfully",
      scheme,
    });

  } catch (error) {
    console.log(`Create-EScheme: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getAllESchemes = async (req, res) => {
  try {

    const schemes = await EScheme.find()
      .populate("author", "displayName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: schemes.length,
      schemes,
    });

  } catch (error) {
    console.log(`Get-All-ESchemes: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getESchemeById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scheme ID",
      });
    }

    const scheme = await EScheme.findById(id)
      .populate("author", "displayName email");

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "External scheme not found",
      });
    }

    res.status(200).json({
      success: true,
      scheme,
    });

  } catch (error) {
    console.log(`Get-EScheme: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const deleteEScheme = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scheme ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const scheme = await EScheme.findById(id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "External scheme not found",
      });
    }

    // delete cover image from disk
    const imagePath = path.join(process.cwd(), "..", scheme.coverImage);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await scheme.deleteOne();

    res.status(200).json({
      success: true,
      message: "External scheme deleted successfully",
    });

  } catch (error) {
    console.log(`Delete-EScheme: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateEScheme = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, description, schemeLink, pdfLink, duration, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scheme ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const scheme = await EScheme.findById(id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "External scheme not found",
      });
    }

    if (title) scheme.title = title;
    if (description) scheme.description = description;
    if (schemeLink) scheme.schemeLink = schemeLink;
    if (pdfLink) scheme.pdfLink = pdfLink;
    if (duration) scheme.duration = duration;
    if (typeof isActive === "boolean") scheme.isActive = isActive;

    // if new image uploaded
    if (req.file) {

      const oldImagePath = path.join(process.cwd(), "..", scheme.coverImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      scheme.coverImage = `storage/${req.id}/general/${req.file.filename}`;
    }

    await scheme.save();

    res.status(200).json({
      success: true,
      message: "External scheme updated successfully",
      scheme,
    });

  } catch (error) {
    console.log(`Update-EScheme: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};