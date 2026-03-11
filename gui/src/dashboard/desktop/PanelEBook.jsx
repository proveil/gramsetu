import React, { useEffect, useState } from "react";
import useEBookStore from "../../store/eBookStore";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";

const PanelEBook = () => {

  const { user } = useAuthStore();

  const {
    books,
    fetchAllBooks,
    createBook,
    updateBook,
    deleteBook,
    loading,
    error,
  } = useEBookStore();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bookLink, setBookLink] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/dashboard/E_Books/${id}`);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setBookLink("");
    setFile(null);
    setEditingBook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !bookLink) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("bookLink", bookLink);

    if (file) formData.append("file", file);

    let success;

    if (editingBook) {
      success = await updateBook(editingBook._id, formData);
    } else {
      success = await createBook(formData);
    }

    if (success) {
      resetForm();
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-3xl font-bold">E-Books</h1>
          <p className="text-zinc-400 text-sm">
            Manage educational books and resources
          </p>
        </div>

        {user?.isAdmin && (
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="px-5 py-2 bg-white text-black rounded-lg font-semibold"
          >
            + Add Book
          </button>
        )}

      </div>

      {error && (
        <div className="mb-4 bg-red-900/40 border border-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-zinc-400">Loading books...</div>
      )}

      {!loading && books.length === 0 && (
        <div className="text-zinc-500 text-center mt-20">
          No books available
        </div>
      )}

      {/* Books Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {books.map((book) => (

          <div
            key={book._id}
            onClick={() => handleCardClick(book._id)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-zinc-600 transition"
          >

            {/* Cover */}
            <div className="h-40 bg-zinc-800 overflow-hidden">

              {book.coverImage ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700">
                  <FaBook className="text-white text-5xl opacity-90" />
                </div>
              )}

            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">

              <div>

                <h2 className="text-lg font-semibold mb-1">
                  {book.title}
                </h2>

                <p className="text-sm text-zinc-400 line-clamp-3 mb-2">
                  {book.description}
                </p>

                <p className="text-xs text-zinc-500 mt-3">
                  Uploaded {new Date(book.createdAt).toLocaleDateString()}
                </p>

                <a
                  href={book.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-medium"
                >
                  <FaBook className="text-xs" />
                  Read Book
                </a>

              </div>

              {user?.isAdmin && (
                <div className="flex gap-2 mt-5">

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBook(book);
                      setTitle(book.title);
                      setDescription(book.description);
                      setBookLink(book.bookLink);
                      setFile(null);
                      setShowModal(true);
                    }}
                    className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Delete this book?")) {
                        deleteBook(book._id);
                      }
                    }}
                    className="flex-1 text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              )}

            </div>

          </div>

        ))}

      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
              resetForm();
            }
          }}
        >

          <div className="bg-zinc-900 p-6 rounded-2xl w-105 border border-zinc-700">

            <h2 className="text-xl font-semibold mb-5 text-center">
              {editingBook ? "Edit Book" : "Add Book"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Book Title"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Book Description"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="text"
                placeholder="Book Link"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={bookLink}
                onChange={(e) => setBookLink(e.target.value)}
              />

              {editingBook?.coverImage && (
                <a
                  href={`http://localhost:4000/${editingBook.coverImage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 text-sm underline"
                >
                  View Current Cover
                </a>
              )}

              <input
                type="file"
                className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <div className="flex justify-between mt-4">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-zinc-700 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black rounded font-semibold"
                >
                  {editingBook ? "Update" : "Create"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default PanelEBook;