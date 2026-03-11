import React from "react";
import Button from "./Button";
import { FaAtlassian } from "react-icons/fa6";
import { IoLogIn } from "react-icons/io5";
import { MdPerson, MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const NavBarHome = () => {

  const nav = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 top-3 z-50
      flex w-[95%] lg:w-[85%] items-center justify-between
      bg-[#0f172a]/70 backdrop-blur-xl border border-white/10
      text-white px-4 py-2 rounded-xl shadow-lg"
    >

      {/* Logo */}
      <div
        onClick={() => nav("/")}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <FaAtlassian className="text-xl lg:text-3xl text-cyan-400" />

        <p className="uppercase font-bold text-sm lg:text-2xl tracking-wider">
          Gramsetu
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">

        {!isAuthenticated ? (
          <>
            <Button
              Icon={IoLogIn}
              text={"Login"}
              onClick={() => nav("/auth")}
              className="text-sm bg-gray-800 hover:bg-gray-700"
            />

            <Button
              Icon={MdPerson}
              text={"Register"}
              onClick={() => nav("/auth?mode=register")}
              className="text-sm bg-cyan-600 hover:bg-cyan-500"
            />
          </>
        ) : (
          <>
            <Button
              Icon={MdDashboard}
              text={"Dashboard"}
              onClick={() => nav("/dashboard")}
              className="text-sm bg-indigo-600 hover:bg-indigo-500"
            />

            <Button
              Icon={FiLogOut}
              text={"Logout"}
              onClick={handleLogout}
              className="text-sm bg-red-600 hover:bg-red-500"
            />
          </>
        )}

      </div>

    </div>
  );
};

export default NavBarHome;