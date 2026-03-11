import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import useNewsStore from "../../store/newsStore";
import { useNavigate } from "react-router-dom";

const PanelNews = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    news,
    fetchAllNews,
    deleteNews,
    createNews,
    updateNews,
    loading,
    error,
  } = useNewsStore();

  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchAllNews();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setEditingNews(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description required");
      return;
    }

    if (!editingNews && !file) {
      alert("Image required for new news");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (file) {
      formData.append("file", file);
    }

    let success;

    if (editingNews) {
      success = await updateNews(editingNews._id, formData);
    } else {
      success = await createNews(formData);
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
          <h1 className="text-3xl font-bold">News Management</h1>
          <p className="text-zinc-400 text-sm">
            Create, manage and delete news articles
          </p>
        </div>

        {user?.isAdmin && (
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:opacity-90 transition"
          >
            + Add News
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-900/40 border border-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-zinc-400">Loading news...</div>
      )}

      {/* Empty */}
      {!loading && news.length === 0 && (
        <div className="text-zinc-500 text-center mt-20">
          No news available.
        </div>
      )}

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {news.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/dashboard/news/${item._id}`)}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition cursor-pointer flex flex-col"
          >

            <img
              src={`${process.env.REACT_APP_API_URL}/${item.coverImage}`}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col flex-1">

              <h2 className="text-lg font-semibold mb-2">
                {item.title}
              </h2>

              <p className="text-sm text-zinc-400 line-clamp-3 mb-2">
                {item.description}
              </p>

              <p className="text-xs text-zinc-500 mb-4">
                Uploaded {new Date(item.createdAt).toLocaleDateString()}
              </p>

              {/* Admin Buttons at bottom */}
              {user?.isAdmin && (
                <div className="flex gap-2 mt-auto pt-4">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingNews(item);
                      setTitle(item.title);
                      setDescription(item.description);
                      setFile(null);
                      setShowModal(true);
                    }}
                    className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      if (window.confirm("Delete this news?")) {
                        deleteNews(item._id);
                      }
                    }}
                    className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
              resetForm();
            }
          }}
        >

          <div className="bg-zinc-900 text-white p-6 rounded-2xl w-105 shadow-2xl border border-zinc-700">

            <h2 className="text-xl font-semibold mb-5 text-center">
              {editingNews ? "Edit News" : "Add News"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Current Image Preview */}
              {editingNews && (
                <img
                  src={`http://localhost:4000/${editingNews.coverImage}`}
                  className="rounded-lg h-40 object-cover"
                />
              )}

              <input
                type="text"
                placeholder="Title"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg outline-none focus:border-white transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg outline-none focus:border-white transition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg cursor-pointer file:bg-zinc-700 file:text-white file:border-none file:px-3 file:py-1 file:rounded file:mr-3"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <div className="flex justify-between mt-4">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading
                    ? editingNews
                      ? "Updating..."
                      : "Uploading..."
                    : editingNews
                    ? "Update"
                    : "Submit"}
                </button>

              </div>

            </form>
          </div>

        </div>
      )}

    </div>
  );
};

export default PanelNews;