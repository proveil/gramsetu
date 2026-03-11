import React, { useEffect, useState } from "react";
import banner from "../raw/auth_wallpaper.webp";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Button from "../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { motion } from "framer-motion";

const Login = () => {

  const nav = useNavigate();

  const [passwordToggle, setPasswordToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      const res = await login(email, password);

      if (res?.user?.isVerified === false) {
        nav("/auth?mode=verify");
        return;
      }

      nav("/dashboard");

    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin(e);
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

          {/* Back button */}
          <div className="absolute right-4 top-4 sm:right-5 sm:top-5 group">

            <IoIosExit
              onClick={() => nav(-1)}
              className="text-gray-400 text-2xl sm:text-3xl cursor-pointer hover:text-white transition"
            />

            <span
              className="
                absolute right-0 bottom-full mb-2
                opacity-0 group-hover:opacity-100
                transition duration-200
                pointer-events-none
                bg-black text-white text-xs px-2 py-1 rounded
                whitespace-nowrap
              "
            >
              Back
            </span>

          </div>

          {/* Title */}
          <h1
            className="
              text-2xl sm:text-3xl font-extrabold mb-6
              bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400
              bg-clip-text text-transparent
              text-center
            "
          >
            Login
          </h1>

          {/* Email */}
          <Input
            onKeyDown={handleKeyDown}
            Icon={MdEmail}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
            className="mb-4 w-full"
          />

          {/* Password */}
          <Input
            onKeyDown={handleKeyDown}
            Icon={FaLock}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={passwordToggle ? "text" : "password"}
            placeholder="Password"
            className="w-full"
          />

          {/* Toggle password */}
          <div
            className="flex items-center gap-2 text-sm text-zinc-300 mt-2 cursor-pointer select-none"
            onClick={() => setPasswordToggle(!passwordToggle)}
          >
            {passwordToggle ? <FaEye /> : <FaEyeSlash />}
            <p>{passwordToggle ? "Hide password" : "Show password"}</p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 mt-3 text-sm text-center sm:text-left">
              {error}
            </p>
          )}

          {/* Forgot password */}
          <div className="flex justify-end w-full mt-2">
            <span
              onClick={() => nav("/auth?mode=forgot-password")}
              className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          {/* Login button */}
          <Button
            onClick={handleLogin}
            text={isLoading ? "Logging in..." : "Login"}
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

          {/* Register */}
          <p className="text-xs sm:text-sm mt-4 text-zinc-400 text-center sm:text-left">
            Don't have an account?{" "}
            <span
              className="text-indigo-400 font-semibold cursor-pointer hover:text-indigo-300"
              onClick={() => nav("/auth?mode=register")}
            >
              Create one
            </span>
          </p>

        </motion.div>

      </div>

    </div>
  );
};

export default Login;