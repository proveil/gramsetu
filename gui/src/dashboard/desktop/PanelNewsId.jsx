import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useNewsStore from "../../store/newsStore";

const PanelNewsId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedNews, fetchNewsById, loading } = useNewsStore();

  useEffect(() => {
    fetchNewsById(id);
  }, [id]);

  if (loading || !selectedNews) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        Loading news...
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

        <img
          src={`http://localhost:4000/${selectedNews.coverImage}`}
          alt={selectedNews.title}
          className="w-full h-150 object-contain rounded-2xl mb-6" // previous: object-cover, h-100
        />

        <h1 className="text-3xl font-bold mb-4">
          {selectedNews.title}
        </h1>

        <p className="text-zinc-400 mb-6">
          By {selectedNews.author?.displayName}
        </p>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl leading-relaxed text-zinc-300">
          {selectedNews.description}
        </div>

      </div>
    </div>
  );
};

export default PanelNewsId;