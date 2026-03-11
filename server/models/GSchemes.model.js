import mongoose from "mongoose";

const gSchemeSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  schemeLink: {
    type: String,
    trim: true,
    required: true
  },

  pdfLink: {
    type: String,
    trim: true,
    required: true
  },

  duration: {
    type: String,
    trim: true,
    required: true
  },

  coverImage: {    
    type: String,
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  }

},
{ timestamps: true }
);

const GScheme = mongoose.model("GScheme", gSchemeSchema);

export default GScheme;