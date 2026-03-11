import { useNavigate, useSearchParams } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useEffect } from "react";
import banner from "../raw/auth_wallpaper.webp";
import Button from "../components/Button";
import { IoIosExit } from "react-icons/io";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import VerifyAccount from "../auth/verifyAccount";
import Unverified from "../auth/Unverified";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";

const Auth = () => {

  const [searchParams] = useSearchParams();
  const { isAuthenticated, isCheckingAuth, user } = useAuthStore();
  const nav = useNavigate();
  const mode = searchParams.get("mode");

  const Banner_Style = {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  useEffect(() => {
    document.title = "Authentication";
  }, []);

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

  if (mode === "login") return <Login />;
  if (mode === "register") return <Register />;
  if (mode === "verify") return <VerifyAccount />;
  if (mode === "unverify") return <Unverified />;
  if (mode === "forgot-password") return <ForgotPassword />;


  if (isCheckingAuth) return null;

  return (
    <div className="text-white">

      <div
        style={Banner_Style}
        className="relative h-screen w-full flex items-center justify-center">

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0b1025]/80 via-[#0b1025]/50 to-[#0b1120]" />

        {/* Auth Card */}
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
          flex flex-col items-center
        "
        >

          {/* Back button */}
          <div className="absolute right-5 top-5 group">

            <IoIosExit
              onClick={() => nav(-1)}
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
              Back
            </span>

          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
            text-4xl font-extrabold mb-6
            bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400
            bg-clip-text text-transparent
            tracking-wide
          "
          >
            Welcome
          </motion.h1>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-4">

            <Button
              text={"Login"}
              onClick={() => nav("/auth?mode=login")}
              className="
              uppercase
              bg-linear-to-r from-indigo-500 to-purple-600
              hover:from-indigo-600 hover:to-purple-700
              w-full py-3
              text-sm md:text-base
              font-bold
              rounded-lg
            "
            />

            <Button
              text={"Create Account"}
              onClick={() => nav("/auth?mode=register")}
              className="
              uppercase
              bg-white/10
              hover:bg-white/20
              border border-white/10
              w-full py-3
              text-sm md:text-base
              font-bold
              rounded-lg
            "
            />

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Auth;