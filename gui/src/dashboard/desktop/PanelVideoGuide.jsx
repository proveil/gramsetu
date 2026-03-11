import React, { useEffect, useState } from "react";
import useTutorialStore from "../../store/tutorialStore";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";

const PanelVideoGuide = () => {

  const { user } = useAuthStore();

  const {
    tutorials,
    fetchAllTutorials,
    createTutorial,
    updateTutorial,
    deleteTutorial,
    loading,
    error,
  } = useTutorialStore();

  const [showModal, setShowModal] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState(null);

  const [title, setTitle] = useState("");
  const [videoID, setVideoID] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTutorials();
  }, []);

  const resetForm = () => {
    setTitle("");
    setVideoID("");
    setFile(null);
    setEditingTutorial(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoID) {
      alert("Title and Video ID required");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("videoID", videoID);

    if (file) formData.append("file", file);

    let success;

    if (editingTutorial) {
      success = await updateTutorial(editingTutorial._id, formData);
    } else {
      success = await createTutorial(formData);
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
          <h1 className="text-3xl font-bold">Video Guides</h1>
          <p className="text-zinc-400 text-sm">
            Manage tutorial videos
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
            + Add Video
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-red-900/40 border border-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-zinc-400">Loading tutorials...</div>
      )}

      {!loading && tutorials.length === 0 && (
        <div className="text-zinc-500 text-center mt-20">
          No tutorials available
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {tutorials.map((tutorial) => (

          <div
            key={tutorial._id}
            onClick={() => navigate(`/dashboard/guides/${tutorial._id}`)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-zinc-600 transition"
          >

            {/* Cover */}
            <div className="h-36 bg-zinc-800 overflow-hidden">

              {tutorial.videoCover ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/${tutorial.videoCover}`}
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-red-600 to-red-800">
                  <FaYoutube className="text-white text-5xl opacity-90" />
                </div>
              )}

            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">

              <div>

                <h2 className="text-lg font-semibold mb-2">
                  {tutorial.title}
                </h2>

                <p className="text-sm text-zinc-400">
                  Video ID: {tutorial.videoID}
                </p>

                <p className="text-xs text-zinc-500 mt-4">
                  Uploaded {new Date(tutorial.createdAt).toLocaleDateString()}
                </p>

              </div>

              {user?.isAdmin && (
                <div className="flex gap-2 mt-6">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      setEditingTutorial(tutorial);
                      setTitle(tutorial.title);
                      setVideoID(tutorial.videoID);
                      setFile(null);

                      setShowModal(true);
                    }}
                    className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Delete this tutorial?")) {
                        deleteTutorial(tutorial._id);
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
              {editingTutorial ? "Edit Video Guide" : "Add Video Guide"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Video Title"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="YouTube Video ID (11 characters)"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={videoID}
                onChange={(e)=>setVideoID(e.target.value)}
              />

              {editingTutorial?.videoCover && (
                <a
                  href={`http://localhost:4000/${editingTutorial.videoCover}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 text-sm underline"
                >
                  View Current Cover
                </a>
              )}

              <input
                type="file"
                className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg"
                onChange={(e)=>setFile(e.target.files[0])}
              />

              <div className="flex justify-between mt-4">

                <button
                  type="button"
                  onClick={()=>{
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
                  {editingTutorial ? "Update" : "Create"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default PanelVideoGuide;