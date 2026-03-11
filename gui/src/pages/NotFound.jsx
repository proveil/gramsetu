import React from "react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page you’re looking for doesn’t exist.</p>

        <a
          href="/"
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;