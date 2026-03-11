import mongoose from "mongoose";
import GScheme from "../models/GSchemes.model.js";
import User from "../models/user.model.js";
import path from "path";
import fs from "fs";


// ✅ GET ALL SCHEMES
export const getAllSchemes = async (req, res) => {
  try {

    const schemes = await GScheme.find()
      .populate("author", "displayName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: schemes.length,
      schemes,
    });

  } catch (error) {

    console.log(`Get-All-Schemes: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ✅ CREATE (Admin Only)
export const createScheme = async (req, res) => {
  try {

    const { title, description, schemeLink, pdfLink, duration } = req.body;

    if (!title || !description || !schemeLink || !pdfLink || !duration) {
      return res.status(400).json({
        success: false,
        message: "Title, description, scheme link, pdf link and duration are required",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Cover image required",
      });
    }

    const coverImagePath = `storage/${req.id}/general/${req.file.filename}`;

    const scheme = await GScheme.create({
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
      message: "Scheme created successfully",
      scheme,
    });

  } catch (error) {

    console.log(`Create-Scheme: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ✅ VIEW SPECIFIC
export const getSchemeById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scheme ID",
      });
    }

    const scheme = await GScheme.findById(id)
      .populate("author", "displayName email");

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    res.status(200).json({
      success: true,
      scheme,
    });

  } catch (error) {

    console.log(`Get-Scheme: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ✅ UPDATE (Admin Only)
export const updateScheme = async (req, res) => {
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

    const scheme = await GScheme.findById(id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    if (title) scheme.title = title;
    if (description) scheme.description = description;
    if (schemeLink) scheme.schemeLink = schemeLink;
    if (pdfLink) scheme.pdfLink = pdfLink;
    if (duration) scheme.duration = duration;
    if (isActive !== undefined) scheme.isActive = isActive;

    if (req.file) {

      if (scheme.coverImage) {

        const oldFile = path.join(process.cwd(), "..", scheme.coverImage);

        if (fs.existsSync(oldFile)) {
          fs.unlinkSync(oldFile);
        }

      }

      scheme.coverImage = `storage/${req.id}/general/${req.file.filename}`;
    }

    await scheme.save();

    res.status(200).json({
      success: true,
      message: "Scheme updated successfully",
      scheme,
    });

  } catch (error) {

    console.log(`Update-Scheme: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ✅ DELETE (Admin Only)
export const deleteScheme = async (req, res) => {
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

    const scheme = await GScheme.findById(id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    if (scheme.coverImage) {

      const filePath = path.join(process.cwd(), "..", scheme.coverImage);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

    }

    await scheme.deleteOne();

    res.status(200).json({
      success: true,
      message: "Scheme deleted successfully",
    });

  } catch (error) {

    console.log(`Delete-Scheme: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};