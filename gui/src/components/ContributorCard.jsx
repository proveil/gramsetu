import React from "react";
import { motion } from "framer-motion";

const ContributorCard = ({ name, role, description }) => {

  const firstLetter = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative w-[90%] md:w-[45%] lg:w-[23%]"
    >

      {/* Glow background */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-600/20 via-indigo-500/10 to-cyan-500/20 blur-2xl opacity-0 hover:opacity-100 transition duration-500" />

      {/* Card */}
      <div className="relative bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-7 flex flex-col items-center text-center text-white shadow-xl transition duration-300 hover:border-purple-500/40">

        {/* Avatar */}
        <div className="relative mb-5">

          {/* halo */}
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-cyan-500 blur-lg opacity-80" />

          {/* avatar */}
          <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-3xl font-bold select-none">
            {firstLetter}
          </div>

        </div>

        {/* Name */}
        <h2 className="text-xl font-semibold tracking-wide">
          {name}
        </h2>

        {/* Role */}
        {role && (
          <p className="text-sm text-purple-400 mt-1">
            {role}
          </p>
        )}

        {/* Divider */}
        <div className="w-14 h-0.5 bg-linear-to-r from-purple-500 to-cyan-400 rounded-full my-4" />

        {/* Description */}
        <p className="text-sm text-zinc-300 leading-relaxed">
          {description}
        </p>

      </div>

    </motion.div>
  );
};

export default ContributorCard;