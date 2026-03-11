import mongoose from "mongoose";
import Emergency from "../models/emergency-services.model.js";
import User from "../models/user.model.js";


// CREATE EMERGENCY SERVICE
export const createEmergency = async (req, res) => {
  try {

    const { title, number, email } = req.body;

    if (!title || !number || !email) {
      return res.status(400).json({
        success: false,
        message: "Title, number and email are required",
      });
    }

    const user = await User.findById(req.id);

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

    const emergency = await Emergency.create({
      title,
      number,
      email,
      author: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Emergency service created",
      emergency,
    });

  } catch (error) {

    console.log(`Create-Emergency: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// GET ALL EMERGENCY SERVICES
export const getAllEmergency = async (req, res) => {
  try {

    const emergencies = await Emergency.find()
      .populate("author", "displayName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emergencies.length,
      emergencies,
    });

  } catch (error) {

    console.log(`Get-All-Emergency: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// GET SINGLE EMERGENCY SERVICE
export const getEmergencyById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const emergency = await Emergency.findById(id)
      .populate("author", "displayName email");

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency service not found",
      });
    }

    res.status(200).json({
      success: true,
      emergency,
    });

  } catch (error) {

    console.log(`Get-Emergency: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// UPDATE EMERGENCY SERVICE
export const updateEmergency = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, number, email, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const emergency = await Emergency.findById(id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency service not found",
      });
    }

    if (title) emergency.title = title;
    if (number) emergency.number = number;
    if (email) emergency.email = email;
    if (isActive !== undefined) emergency.isActive = isActive;

    await emergency.save();

    res.status(200).json({
      success: true,
      message: "Emergency updated",
      emergency,
    });

  } catch (error) {

    console.log(`Update-Emergency: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// DELETE EMERGENCY SERVICE
export const deleteEmergency = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const emergency = await Emergency.findById(id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency service not found",
      });
    }

    await emergency.deleteOne();

    res.status(200).json({
      success: true,
      message: "Emergency service deleted",
    });

  } catch (error) {

    console.log(`Delete-Emergency: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};