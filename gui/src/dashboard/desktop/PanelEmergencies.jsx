import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import useEmergencyStore from "../../store/emergenciesStore";
import { useNavigate } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa";

const PanelEmergencies = () => {

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    emergencies,
    fetchAllEmergency,
    deleteEmergency,
    createEmergency,
    updateEmergency,
    loading,
    error,
  } = useEmergencyStore();

  const [showModal, setShowModal] = useState(false);
  const [editingEmergency, setEditingEmergency] = useState(null);

  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchAllEmergency();
  }, []);

  const resetForm = () => {
    setTitle("");
    setNumber("");
    setEmail("");
    setEditingEmergency(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !number || !email) {
      alert("Title, number and email are required");
      return;
    }

    const data = {
      title,
      number,
      email,
    };

    let success;

    if (editingEmergency) {
      success = await updateEmergency(editingEmergency._id, data);
    } else {
      success = await createEmergency(data);
    }

    if (success) {
      resetForm();
      setShowModal(false);
    }
  };

  const toggleActive = async (item, e) => {
    e.stopPropagation();

    await updateEmergency(item._id, {
      title: item.title,
      number: item.number,
      email: item.email,
      isActive: !item.isActive,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Emergency Services</h1>
          <p className="text-zinc-400 text-sm">
            Manage emergency contacts
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
            + Add Service
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-red-900/40 border border-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-zinc-400">Loading services...</div>
      )}

      {!loading && emergencies.length === 0 && (
        <div className="text-zinc-500 text-center mt-20">
          No emergency services available.
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {emergencies.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/dashboard/emergency-services/${item._id}`)}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition cursor-pointer flex flex-col"
          >

            {/* Purple Header */}
            <div className="relative h-36 bg-linear-to-r from-purple-600 to-purple-800 flex items-center justify-center overflow-hidden">

              <FaPhoneVolume
                size={160}
                className="absolute text-white opacity-10 -rotate-45"
              />

              <p className="text-3xl font-bold text-white z-10">
                {item.number}
              </p>

            </div>

            <div className="p-4 flex flex-col flex-1">

              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                  {item.title}
                </h2>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.isActive
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-sm text-zinc-400 mb-2">
                {item.email}
              </p>

              <p className="text-xs text-zinc-500 mb-4">
                Added {new Date(item.createdAt).toLocaleDateString()}
              </p>

              {user?.isAdmin && (
                <div className="flex gap-2 mt-auto pt-4 flex-wrap">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingEmergency(item);
                      setTitle(item.title);
                      setNumber(item.number);
                      setEmail(item.email);
                      setShowModal(true);
                    }}
                    className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Delete this service?")) {
                        deleteEmergency(item._id);
                      }
                    }}
                    className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={(e) => toggleActive(item, e)}
                    className={`text-sm px-3 py-1 rounded ${
                      item.isActive
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {item.isActive ? "Deactivate" : "Activate"}
                  </button>

                </div>
              )}

            </div>
          </div>
        ))}

      </div>

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
              {editingEmergency
                ? "Edit Emergency Service"
                : "Add Emergency Service"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Service Title"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg outline-none focus:border-white transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg outline-none focus:border-white transition"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg outline-none focus:border-white transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                    ? editingEmergency
                      ? "Updating..."
                      : "Creating..."
                    : editingEmergency
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

export default PanelEmergencies;