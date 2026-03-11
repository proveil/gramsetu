import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEBookStore from "../../store/eBookStore";
import { FaBook } from "react-icons/fa";

const PanelEBookId = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedBook, fetchBookById, loading } = useEBookStore();

  useEffect(() => {
    fetchBookById(id);
  }, [id]);

  if (loading || !selectedBook) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        Loading book...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto">

        {/* Cover Image */}
        {selectedBook.coverImage && ( 
            <div className="flex justify-center mb-8"> 
            <img src={`/${selectedBook.coverImage}`} 
            alt={selectedBook.title} 
            className="w-64 h-105 object-cover rounded-xl shadow-lg border border-zinc-800" /> 
            </div> )}

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">
          {selectedBook.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-6">

          <span>
            By {selectedBook.author?.displayName}
          </span>

          <span>
            Uploaded {new Date(selectedBook.createdAt).toLocaleDateString()}
          </span>

        </div>
        
        {/* Description */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <p className="text-zinc-300 leading-relaxed">
            {selectedBook.description}
          </p>

        </div>

        {/* Action */}
        <a
          href={selectedBook.bookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold"
        >
          <FaBook />
          Read Book
        </a>

      </div>

    </div>
  );
};

export default PanelEBookId;