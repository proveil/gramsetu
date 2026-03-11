import React, { useEffect, useState } from "react";
import useESchemeStore from "../../store/eschemeStore";
import useAuthStore from "../../store/authStore";
import { FaBuildingColumns } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PanelESchemes = () => {

  const { user } = useAuthStore();

  const {
    schemes,
    fetchAllESchemes,
    createEScheme,
    updateEScheme,
    deleteEScheme,
    loading,
    error,
  } = useESchemeStore();

  const [showModal, setShowModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schemeLink, setSchemeLink] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllESchemes();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSchemeLink("");
    setPdfLink("");
    setDuration("");
    setFile(null);
    setEditingScheme(null);
    setIsActive(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !schemeLink || !pdfLink || !duration) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("schemeLink", schemeLink);
    formData.append("pdfLink", pdfLink);
    formData.append("duration", duration);
    formData.append("isActive", isActive);

    if (file) formData.append("file", file);

    let success;

    if (editingScheme) {
      success = await updateEScheme(editingScheme._id, formData);
    } else {
      success = await createEScheme(formData);
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
          <h1 className="text-3xl font-bold">External Schemes</h1>
          <p className="text-zinc-400 text-sm">
            Manage external schemes and opportunities
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
            + Add Scheme
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-red-900/40 border border-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {loading && <div className="text-zinc-400">Loading schemes...</div>}

      {!loading && schemes.length === 0 && (
        <div className="text-zinc-500 text-center mt-20">
          No external schemes available
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {schemes.map((scheme) => (

          <div
            key={scheme._id}
            onClick={() => navigate(`/dashboard/eschemes/${scheme._id}`)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-zinc-600 transition"
          >

            {/* Cover */}
            <div className="h-36 bg-zinc-800 overflow-hidden">

              {scheme.coverImage ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/${scheme.coverImage}`}
                  alt={scheme.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-purple-600 via-indigo-600 to-purple-800">
                  <FaBuildingColumns className="text-white text-5xl opacity-90" />
                </div>
              )}

            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">

              <div>

                <h2 className="text-lg font-semibold mb-1">
                  {scheme.title}
                </h2>

                <p className="text-sm text-zinc-400 line-clamp-2 mb-2">
                  {scheme.description}
                </p>

                <p className="text-sm text-zinc-400 mb-2">
                  Duration: {scheme.duration}
                </p>

                <a
                  href={scheme.schemeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 text-sm underline block"
                  onClick={(e)=>e.stopPropagation()}
                >
                  Official Scheme Page
                </a>

                <a
                  href={scheme.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 text-sm underline block mt-1"
                  onClick={(e)=>e.stopPropagation()}
                >
                  View Official PDF
                </a>

                <p className="text-xs text-zinc-500 mt-4">
                  Uploaded {new Date(scheme.createdAt).toLocaleDateString()}
                </p>

                {!scheme.isActive && (
                  <p className="text-xs text-red-400 mt-1">
                    Scheme Disabled
                  </p>
                )}

              </div>

              {user?.isAdmin && (
                <div className="flex gap-2 mt-6">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      setEditingScheme(scheme);
                      setTitle(scheme.title);
                      setDescription(scheme.description);
                      setSchemeLink(scheme.schemeLink);
                      setPdfLink(scheme.pdfLink);
                      setDuration(scheme.duration);
                      setIsActive(scheme.isActive);
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
                      if (window.confirm("Delete this scheme?")) {
                        deleteEScheme(scheme._id);
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
          onClick={(e)=>{
            if(e.target === e.currentTarget){
              setShowModal(false);
              resetForm();
            }
          }}
        >

          <div className="bg-zinc-900 p-6 rounded-2xl w-105 border border-zinc-700">

            <h2 className="text-xl font-semibold mb-5 text-center">
              {editingScheme ? "Edit Scheme" : "Add Scheme"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Scheme Title"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />

              <textarea
                placeholder="Scheme Description"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />

              <input
                type="text"
                placeholder="Scheme Website Link"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={schemeLink}
                onChange={(e)=>setSchemeLink(e.target.value)}
              />

              <input
                type="text"
                placeholder="Official PDF Link"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={pdfLink}
                onChange={(e)=>setPdfLink(e.target.value)}
              />

              <input
                type="text"
                placeholder="Scheme Duration"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg"
                value={duration}
                onChange={(e)=>setDuration(e.target.value)}
              />

              {editingScheme?.coverImage && (
                <a
                  href={`${process.env.REACT_APP_API_URL}/${editingScheme.coverImage}`}
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
                onChange={(e)=>setFile(e.target.files[0])}
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e)=>setIsActive(e.target.checked)}
                />
                Active Scheme
              </label>

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
                  {editingScheme ? "Update" : "Create"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default PanelESchemes;