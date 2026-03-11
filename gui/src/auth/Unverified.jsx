import React from "react";
import banner from "../raw/auth_wallpaper.webp";
import { useNavigate } from "react-router-dom";
import { IoIosExit } from "react-icons/io";
import { MdWarning } from "react-icons/md";
import { motion } from "framer-motion";
import Button from "../components/Button";
import useAuthStore from "../store/authStore";

const Unverified = () => {

  const nav = useNavigate();

  const { user, logout, isCheckingAuth } = useAuthStore();
  const displayName = user?.displayName || "User";

  if (isCheckingAuth) {
    return null;
  }

  const Banner_Style = {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  const handleLogout = async () => {
    try {
      await logout();
      nav("/auth?mode=login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = () => {
    nav("/auth?mode=verify");
  };

  return (
    <div className="text-white">

      <div
        style={Banner_Style}
        className="relative flex items-center justify-center w-full h-screen"
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0b1025]/80 via-[#0b1025]/50 to-[#0b1120]" />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            relative z-10
            backdrop-blur-xl
            bg-white/5
            border border-white/10
            shadow-2xl
            rounded-2xl
            w-full max-w-md
            p-8
            flex flex-col items-center text-center
          "
        >

          {/* Logout Icon */}
          <div className="absolute right-5 top-5 group">

            <IoIosExit
              onClick={handleLogout}
              className="text-gray-400 text-2xl cursor-pointer hover:text-white transition"
            />

            <span className="
              absolute right-0 bottom-full mb-2
              opacity-0 group-hover:opacity-100
              transition duration-200
              pointer-events-none
              bg-black text-white text-xs px-2 py-1 rounded
              whitespace-nowrap
            ">
              Logout
            </span>

          </div>

          {/* Warning Icon */}
          <MdWarning className="text-yellow-400 text-6xl mb-4" />

          {/* Title */}
          <h1
            className="
              text-3xl font-extrabold mb-3
              bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400
              bg-clip-text text-transparent
            "
          >
            Account Not Verified
          </h1>

          {/* Message */}
          <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
            Hello <span className="font-semibold">{displayName}</span>, your account is not verified yet.
            <br />
            Please verify your account to continue using the platform.
          </p>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            text="Verify Account"
            className="
              bg-linear-to-r from-indigo-500 to-purple-600
              hover:from-indigo-600 hover:to-purple-700
              w-full
              py-3
              font-bold
              rounded-lg
              mb-3
            "
          />

          {/* Logout Text */}
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Logout
          </button>

        </motion.div>

      </div>
    </div>
  );
};

export default Unverified;