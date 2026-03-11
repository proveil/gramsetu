import React, { useEffect, useState } from "react";
import banner from "../raw/auth_wallpaper.webp";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import Input from "../components/Input";
import Button from "../components/Button";
import useAuthStore from "../store/authStore";

const ForgotPassword = () => {

  const nav = useNavigate();
  const [email, setEmail] = useState("");

  const { forgotPassword, isLoading, error, message } = useAuthStore();

  const Banner_Style = {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };
  const { isAuthenticated, isCheckingAuth, user } = useAuthStore();
    useEffect(() => {
      if (isCheckingAuth) return;
  
      if (isAuthenticated) {
        if (user && !user.isVerified) {
          nav("/auth?mode=verify");
        } else {
          nav("/dashboard");
        }
      }
    }, [isAuthenticated, isCheckingAuth, user, nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  return (
    <div className="text-white">

      <div
        style={Banner_Style}
        className="relative flex items-center justify-center w-full min-h-screen px-4 sm:px-6 md:px-8"
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
            w-full
            max-w-sm
            sm:max-w-md
            md:max-w-lg
            p-6
            sm:p-8
            flex flex-col
          "
        >

          {/* Back */}
          <div className="absolute right-4 top-4 sm:right-5 sm:top-5 group">

            <IoIosExit
              onClick={() => nav("/auth?mode=login")}
              className="text-gray-400 text-2xl sm:text-3xl cursor-pointer hover:text-white transition"
            />

            <span className="
              absolute right-0 bottom-full mb-2
              opacity-0 group-hover:opacity-100
              transition duration-200
              pointer-events-none
              bg-black text-white text-xs px-2 py-1 rounded
              whitespace-nowrap
            ">
              Back
            </span>

          </div>

          {/* Title */}
          <h1
            className="
            text-2xl sm:text-3xl font-extrabold mb-4
            bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400
            bg-clip-text text-transparent
            text-center
          "
          >
            Forgot Password
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base text-center mb-6">
            Enter your email and we'll send you a password reset link.
          </p>

          {/* Email input */}
          <Input
            onKeyDown={handleKeyDown}
            Icon={MdEmail}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
            className="w-full"
          />

          {/* Error */}
          {error && (
            <p className="text-red-400 mt-3 text-sm text-center">
              {error}
            </p>
          )}

          {/* Success message */}
          {message && (
            <p className="text-green-400 mt-3 text-sm text-center">
              {message}
            </p>
          )}

          {/* Button */}
          <Button
            onClick={handleSubmit}
            text={isLoading ? "Sending..." : "Send Reset Link"}
            disabled={isLoading}
            className="
              mt-6 sm:mt-8
              bg-linear-to-r from-indigo-500 to-purple-600
              hover:from-indigo-600 hover:to-purple-700
              w-full
              py-3
              font-bold
              rounded-lg
            "
          />

          {/* Footer */}
          <p className="text-xs sm:text-sm mt-4 text-zinc-400 text-center">
            Remember your password?{" "}
            <span
              className="text-indigo-400 cursor-pointer hover:text-indigo-300"
              onClick={() => nav("/auth?mode=login")}
            >
              Login
            </span>
          </p>

        </motion.div>

      </div>

    </div>
  );
};

export default ForgotPassword;