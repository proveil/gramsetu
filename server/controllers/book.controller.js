import mongoose from "mongoose";
import Book from "../models/eBooks.model.js";
import User from "../models/user.model.js";
import path from "path";
import fs from "fs";


// CREATE BOOK
export const createBook = async (req, res) => {
  try {

    const { title, description, bookLink } = req.body;

    if (!title || !description || !bookLink) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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

    const book = await Book.create({
      title,
      description,
      bookLink,
      coverImage: coverImagePath,
      author: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book,
    });

  } catch (error) {

    console.log(`Create-Book: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// GET ALL BOOKS
export const getAllBooks = async (req, res) => {
  try {

    const books = await Book.find()
      .populate("author", "displayName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });

  } catch (error) {

    console.log(`Get-All-Books: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// GET BOOK BY ID
export const getBookById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    const book = await Book.findById(id)
      .populate("author", "displayName email");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });

  } catch (error) {

    console.log(`Get-Book: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// UPDATE BOOK
export const updateBook = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, description, bookLink } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (title) book.title = title;
    if (description) book.description = description;
    if (bookLink) book.bookLink = bookLink;

    if (req.file) {

      if (book.coverImage) {

        const oldFile = path.join(process.cwd(), "..", book.coverImage);

        if (fs.existsSync(oldFile)) {
          fs.unlinkSync(oldFile);
        }

      }

      book.coverImage = `storage/${req.id}/general/${req.file.filename}`;
    }

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });

  } catch (error) {

    console.log(`Update-Book: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// DELETE BOOK
export const deleteBook = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Low permissions",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.coverImage) {

      const filePath = path.join(process.cwd(), "..", book.coverImage);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {

    console.log(`Delete-Book: ${error.message}`);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};