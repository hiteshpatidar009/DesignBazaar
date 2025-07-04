import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-black text-white px-6 py-12 flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Custom glowing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-yellow-400/60 rounded-full blur-2xl pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 20,
        }}
      />

      {/* Background glowing blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 opacity-10 rounded-full blur-3xl animate-pulse -z-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 opacity-10 rounded-full blur-3xl animate-pulse -z-20" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-yellow-400 via-gray-300 to-orange-400 bg-clip-text text-transparent"
      >
        Welcome to DesignBazaar
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg md:text-xl mt-6 text-center text-gray-400 max-w-2xl"
      >
        A community-driven platform where developers share and showcase beautiful, reusable UI components.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-10 flex flex-wrap gap-6 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full text-black font-semibold bg-gradient-to-r from-yellow-400 via-gray-300 to-orange-400 shadow-lg"
          onClick={() => window.location.href = '/Mainpage'}
        >
          Explore Components
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full border border-white/10 text-white shadow-lg backdrop-blur-md"
          onClick={() => navigate('/vender/login')}
        >
          Become a Contributor
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
