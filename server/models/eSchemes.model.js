import mongoose from "mongoose";

const eSchemeSchema = new mongoose.Schema(
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
      required: true,
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
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
    },
  },
  { timestamps: true }
);

const EScheme = mongoose.model("EScheme", eSchemeSchema);

export default EScheme;