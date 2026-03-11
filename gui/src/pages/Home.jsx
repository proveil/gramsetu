import React, { useEffect } from "react";
import NavBarHome from "../components/NavBarHome";
import Banner from "../raw/banner.jpeg";
import Button from "../components/Button";
import { FaYoutube, FaInstagram, FaFacebookF, FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../raw/logo-1.png";
import co from "../raw/co.png";
import VideoPreview from "../components/VideoPreview";
import ContributorCard from "../components/ContributorCard";

const Home = () => {

  const nav = useNavigate();

  useEffect(() => {
    document.title = "Gramsetu";
  }, []);

  const Banner_Style = {
    backgroundImage: `url(${Banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <div className="relative min-h-screen bg-[#0b1120] w-full select-none md:select-text">

      <NavBarHome />

      {/* ---------------- Banner Section ---------------- */}
      <div
        style={Banner_Style}
        className="h-[80vh] w-full relative flex justify-center items-center"
      >

        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0b1025]/80 via-[#16213e]/50 to-[#0b1120]" />

        {/* banner content */}
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center text-center text-white px-6"
        >

          {/* logo */}
          <div className="flex items-center gap-4 mb-4 h-40 w-72 md:h-72 md:w-130">
            <img src={logo} alt="logo" className="h-full w-full object-contain" />
          </div>

          {/* tagline */}
          <p className="text-white/70 text-lg md:text-xl max-w-xl mb-8">
            Connecting villages digitally for a smarter, stronger community.
          </p>

          <Button onClick={() => nav("/auth?mode=register")} text="Get Started" />

        </motion.div>
      </div>

      {/* divider */}
      <div className="w-full flex justify-center my-20">
        <div className="w-[90%] md:w-[70%] h-px bg-linear-to-r from-transparent via-white/60 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
      </div>

      {/* ---------------- What is GRAMSETU ---------------- */}
      <div className="relative z-10 text-white w-full flex justify-center">

        <div className="bg-gray-800 w-[90%] md:w-[70%] flex flex-col md:flex-row p-4 md:p-6 rounded-lg gap-6">

          <div className="w-full md:w-[50%] flex flex-col justify-between">

            <div>
              <p className="text-3xl font-bold mb-3">What is GRAMSETU?</p>

              <p className="text-white/80 leading-relaxed">
                GRAMSETU is a digital platform created to connect rural communities with
                essential services and opportunities. It provides easy access to
                government schemes, emergency contacts, educational resources,
                news updates, and helpful guides. By bringing all this information
                into one simple platform, GRAMSETU empowers villagers with knowledge,
                improves accessibility, and strengthens the connection between
                citizens and public services.
              </p>
            </div>

            <div className="mt-4">
              <Button text="Learn More" />
            </div>

          </div>

          {/* video */}
          <div className="w-full md:w-[50%] aspect-video bg-black rounded-md overflow-hidden">
            <VideoPreview poster={logo} url={"/setu.mp4"} />
          </div>

        </div>
      </div>

      {/* divider */}
      <div className="w-full flex justify-center my-20">
        <div className="w-[90%] md:w-[70%] h-px bg-linear-to-r from-transparent via-white/60 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
      </div>

      {/* ---------------- Contributors ---------------- */}
      <div className="text-white flex justify-center mb-8">
        <p className="text-4xl font-bold">Contributors</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-6">

        <ContributorCard
          name="Aryan"
          role="Full Stack Developer"
          description="Creator of GramSetu. Focused on building digital tools that connect villages with government services."
        />

        <ContributorCard
          name="Bhushan"
          role="UI Designer"
          description="Designs accessible and clean interfaces to make technology easier to use for rural communities."
        />

      </div>

      {/* ---------------- Social ---------------- */}
      <div className="text-white bg-black p-6 my-16 flex justify-center shadow-2xl">

        <div className="flex items-center gap-5">

          <p className="text-xl md:text-2xl bg-linear-to-t from-cyan-500 to-cyan-200 bg-clip-text text-transparent">
            Follow us
          </p>

          {[FaYoutube, FaInstagram, BsTwitterX, FaDiscord, FaFacebookF].map((Icon, i) => (
            <div
              key={i}
              className="bg-gray-300 rounded-full size-7 flex justify-center items-center text-black cursor-pointer hover:scale-110 transition"
            >
              <Icon className="text-sm" />
            </div>
          ))}

        </div>

      </div>

      {/* ---------------- Footer ---------------- */}
      <div className="p-4 flex flex-col items-center text-white">

        <div className="h-32 w-72 md:h-44 md:w-96">
          <img src={co} alt="studio" className="h-full w-full object-contain" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm uppercase mt-4 text-white/70">

          <p>About & Contact</p>
          <p>Terms of Service</p>
          <p>EULA</p>
          <p>Cookie Policy</p>
          <p>Privacy</p>
          <p>Security</p>
          <p>Support</p>

        </div>

        <div className="flex flex-col items-center my-4 text-gray-500 text-xs md:text-sm">

          <p>©2026 PROTAG STUDIOS INDIA INC. ALL RIGHTS RESERVED</p>
          <p>All trademarks referenced herein are the properties of their respective owners.</p>

        </div>

      </div>

    </div>
  );
};

export default Home;