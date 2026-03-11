import React, { useState } from "react";
import PanelCards from "../../components/PanelCards";
import { MdHome, MdExitToApp, MdMenu, MdClose } from "react-icons/md";
import { FaBookBookmark, FaBuildingColumns, FaPhoneVolume } from "react-icons/fa6";
import { PiNewspaperClippingDuotone } from "react-icons/pi";
import { BiSolidVideos } from "react-icons/bi";
import { TbSpeakerphone } from "react-icons/tb";
import { GiFarmer } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const DashboardFrameDesktop = ({ children }) => {

  const { logout, user } = useAuthStore();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    nav("/auth", { replace: true });
  };

  return (
    <div className="text-white flex h-screen w-full bg-[#0b0f19] overflow-hidden">

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed z-40 lg:static top-0 left-0 h-full w-72
          bg-linear-to-b from-[#0f172a] to-[#090e17]
          border-r border-white/5 flex flex-col
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Logo + Close */}
        <div className="px-6 pt-8 pb-6 flex justify-between items-start">

          <div>
            <h1 className="text-2xl font-bold tracking-wider bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              GRAMSETU
            </h1>

            <p className="text-xs text-zinc-500 mt-1 tracking-wide">
              Connecting villages digitally
            </p>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-2xl text-zinc-400 hover:text-white"
          >
            <MdClose />
          </button>

        </div>

        <div className="mt-2 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* Navigation */}
        <div className="flex flex-col flex-1 justify-between px-4 pb-6 mt-6">

          <div className="flex flex-col gap-6">

            {/* Dashboard Section */}
            <div>

              <p className="text-xs uppercase tracking-wider text-zinc-500 px-3 mb-2">
                Dashboard
              </p>

              <div className="flex flex-col gap-2">
                <PanelCards title="Home" Icon={MdHome} nav="/dashboard" />
                <PanelCards title="News" Icon={PiNewspaperClippingDuotone} nav="/dashboard/news" />
                <PanelCards title="Government Schemes" Icon={FaBuildingColumns} nav="/dashboard/gov-schemes" />
                <PanelCards title="E-Books" Icon={FaBookBookmark} nav="/dashboard/E_Books" />
                <PanelCards title="Emergency Services" Icon={FaPhoneVolume} nav="/dashboard/emergency-services" />
                <PanelCards title="E-Schemes" Icon={TbSpeakerphone} nav="/dashboard/eschemes" />
                <PanelCards title="Video Guides" Icon={BiSolidVideos} nav="/dashboard/guides" />
              </div>

            </div>


            {/* Upcoming Features */}
            <div>

              <p className="text-xs uppercase tracking-wider text-zinc-500 px-3 mb-2">
                Upcoming Features
              </p>

              <div className="flex flex-col gap-2 opacity-60">
                <PanelCards title="Farmer Skill Development" Icon={GiFarmer} />
                <PanelCards title="Village Announcements" Icon={TbSpeakerphone} />
                <PanelCards title="Farmer Market" Icon={FaBuildingColumns} />
                <PanelCards title="Automative Helpers" Icon={FaHandsHelping} />
              </div>

            </div>

          </div>


          {/* Logout */}
          <div className="pt-6 border-t border-white/5">
            <PanelCards
              title="Logout"
              onClick={handleLogout}
              Icon={MdExitToApp}
              flipIcon
              className="hover:bg-red-500/20 hover:text-red-400"
            />
          </div>

        </div>

      </div>


      {/* Main Layout */}
      <div className="flex flex-col flex-1">

        {/* Topbar */}
        <div className="flex justify-between items-center px-4 lg:px-8 py-4 bg-[#111827]/60 border-b border-white/5 backdrop-blur-xl">

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-2xl"
          >
            <MdMenu />
          </button>

          <h2 className="text-lg font-semibold tracking-wide text-zinc-300">
            Dashboard
          </h2>

          {/* Profile */}
          <div className="flex items-center gap-3 bg-[#1f2937] px-4 py-2 rounded-2xl border border-white/5">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-zinc-400">
                {user?.email}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
              {user?.displayName?.charAt(0).toUpperCase()}
            </div>

          </div>

        </div>


        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-[#0b0f19]">
          {children}
        </div>

      </div>

    </div>
  );
};

export default DashboardFrameDesktop;