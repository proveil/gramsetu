import mongoose from "mongoose";

const eBooksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true
    },
    bookLink: {
      type: String,
      required: true,
      trim: true
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
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", eBooksSchema);

export default Book;