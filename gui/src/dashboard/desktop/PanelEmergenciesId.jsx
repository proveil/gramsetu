import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmergencyStore from "../../store/emergenciesStore";
import { FaPhoneVolume } from "react-icons/fa";

const PanelEmergenciesId = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedEmergency,
    fetchEmergencyById,
    loading,
  } = useEmergencyStore();

  useEffect(() => {
    fetchEmergencyById(id);
  }, [id]);

  if (loading || !selectedEmergency) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        Loading emergency service...
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

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="relative h-56 bg-linear-to-r from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">

          <FaPhoneVolume
            size={200}
            className="absolute text-white opacity-10 -rotate-45"
          />

          <div className="text-center z-10">
            <p className="text-sm text-purple-200 mb-1">
              Emergency Number
            </p>

            <h1 className="text-5xl font-bold">
              {selectedEmergency.number}
            </h1>
          </div>

        </div>

        {/* Details */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6">

          <div>
            <p className="text-zinc-400 text-sm">Service Title</p>
            <p className="text-lg font-semibold">
              {selectedEmergency.title}
            </p>
          </div>

          <div>
            <p className="text-zinc-400 text-sm">Email</p>
            <p className="text-lg">
              {selectedEmergency.email}
            </p>
          </div>

          <div>
            <p className="text-zinc-400 text-sm">Status</p>
            <span
              className={`px-3 py-1 text-sm rounded ${
                selectedEmergency.isActive
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {selectedEmergency.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div>
            <p className="text-zinc-400 text-sm">Created By</p>
            <p>
              {selectedEmergency.author?.displayName || "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-zinc-400 text-sm">Created At</p>
            <p>
              {new Date(selectedEmergency.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Call Button */}
          <a
            href={`tel:${selectedEmergency.number}`}
            className="block text-center mt-6 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition"
          >
            Call Now
          </a>

        </div>

      </div>

    </div>
  );
};

export default PanelEmergenciesId;