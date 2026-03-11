import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSchemeStore from "../../store/gschemeStore";

const PanelGSchemeId = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedScheme,
    fetchSchemeById,
    loading
  } = useSchemeStore();

  useEffect(() => {
    fetchSchemeById(id);
  }, [id]);

  if (loading || !selectedScheme) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        Loading scheme...
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

        {/* Cover */}
        <img
          src={`${process.env.REACT_APP_API_URL}/${selectedScheme.coverImage}`}
          alt={selectedScheme.title}
          className="w-full h-100 object-cover rounded-2xl mb-6"
        />

        <h1 className="text-3xl font-bold mb-2">
          {selectedScheme.title}
        </h1>

        <p className="text-zinc-400 mb-4">
          By {selectedScheme.author?.displayName}
        </p>

        {/* Status */}
        <div className="mb-6">
          <span
            className={`px-3 py-1 text-sm rounded ${
              selectedScheme.isActive
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {selectedScheme.isActive ? "Active Scheme" : "Inactive Scheme"}
          </span>
        </div>

        {/* Description */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl leading-relaxed text-zinc-300 mb-6">
          {selectedScheme.description}
        </div>

        {/* Details */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">

          <p>
            <span className="text-zinc-400">Duration:</span>{" "}
            {selectedScheme.duration}
          </p>

          <p>
            <span className="text-zinc-400">Uploaded:</span>{" "}
            {new Date(selectedScheme.createdAt).toLocaleDateString()}
          </p>

          <div className="pt-2 flex flex-col gap-2">

            <a
              href={selectedScheme.schemeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-center font-semibold"
            >
              Visit Official Scheme Page
            </a>

            <a
              href={selectedScheme.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-center font-semibold"
            >
              View Official PDF
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PanelGSchemeId;