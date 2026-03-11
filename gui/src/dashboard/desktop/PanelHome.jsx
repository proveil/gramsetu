import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import {
  PiNewspaperClippingDuotone,
} from "react-icons/pi";
import {
  FaBookBookmark,
  FaBuildingColumns,
  FaPhoneVolume,
} from "react-icons/fa6";
import { TbSpeakerphone } from "react-icons/tb";
import { BiSolidVideos } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import useNewsStore from "../../store/newsStore";

const PanelHome = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { news, fetchAllNews,count } = useNewsStore();


  useEffect(() => {
    fetchAllNews();
  }, []);

  const features = [
    {
      title: "News",
      description: "Manage and publish community updates.",
      icon: PiNewspaperClippingDuotone,
      path: "/dashboard/news",
    },
    {
      title: "Government Schemes",
      description: "Add and manage government initiatives.",
      icon: FaBuildingColumns,
      path: "/dashboard/gov-schemes",
    },
    {
      title: "E-Books",
      description: "Upload and organize digital books.",
      icon: FaBookBookmark,
      path: "/dashboard/E_books",
    },
    {
      title: "Emergency Services",
      description: "Maintain emergency contact information.",
      icon: FaPhoneVolume,
      path: "/dashboard/emergency-services",
    },
    {
      title: "External Schemes",
      description: "Manage private or external schemes.",
      icon: TbSpeakerphone,
      path: "/dashboard/eschemes",
    },
    {
      title: "Video Guides",
      description: "Add helpful video tutorials.",
      icon: BiSolidVideos,
      path: "/dashboard/guides",
    },
  ];

  return (
    <div className="relative min-h-full text-white space-y-12">

      {/* Soft Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full -z-10" />

      {/* Hero */}
      <div className="bg-linear-to-r from-indigo-500/10 to-purple-500/10 border border-white/5 rounded-3xl p-10 backdrop-blur-xl">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {user?.displayName || "User"}
              </span>
            </h1>

            <p className="text-zinc-400 max-w-xl">
              Monitor and manage your digital village ecosystem from one central dashboard.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-400 text-sm border border-indigo-500/30">
            {user?.isAdmin ? "Administrator" : "User"}
          </div>

        </div>
      </div>

      {/* Stats Row */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Modules", value: "6" },
          { label: "System Status", value: "Operational" },
          { label: "Published News", value: count },
          { label: "Storage Used", value: "2TB" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/40 transition"
          >
            <p className="text-sm text-zinc-400 mb-2">
              {stat.label}
            </p>
            <h3 className="text-2xl font-semibold">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate("/dashboard/news")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl transition"
          >
            <MdAdd />
            Add News
          </button>

          <button
            onClick={() => navigate("/dashboard/e-books")}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl transition"
          >
            <MdAdd />
            Add E-Book
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-6">Platform Modules</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                className="group cursor-pointer bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all duration-300"
              >
                <Icon className="text-3xl text-indigo-400 group-hover:scale-110 transition mb-5" />

                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-zinc-400">
                  {feature.description}
                </p>

                <div className="mt-6 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition">
                  Open →
                </div>
              </div>
            );
          })}
        </div>
      </div>

            {/* Recent Activity Section */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

        <div className="space-y-4 text-sm text-zinc-400">
          <div className="flex justify-between">
            <span>System initialized successfully</span>
            <span>Just now</span>
          </div>
          <div className="flex justify-between">
            <span>Dashboard accessed</span>
            <span>Today</span>
          </div>
          <div className="flex justify-between">
            <span>Modules operational</span>
            <span>Active</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PanelHome;