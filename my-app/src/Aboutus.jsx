import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Glowing background orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 opacity-10 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 opacity-10 rounded-full blur-3xl animate-pulse -z-10" />

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-yellow-400 via-gray-300 to-orange-400 bg-clip-text text-transparent mb-10"
      >
        About DesignBazaar
      </motion.h1>

      {/* Story Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-lg md:text-xl text-gray-300 max-w-3xl text-center leading-relaxed"
      >
        Hi, I’m Hitesh Patidar — a passionate developer who always believed in building tools that empower others. 
        While working on multiple front-end projects, I realized there’s no central place where developers can easily 
        discover and contribute high-quality UI components. That inspired me to create <span className="text-yellow-400 font-semibold">DesignBazaar</span> — a platform where creativity meets collaboration.
      </motion.p>

      {/* Personal Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-8 max-w-2xl text-center text-gray-400"
      >
        <p className="mb-4">
          My mission is simple: bring developers together and offer a marketplace of ideas, components, and creativity — completely open-source. 
        </p>
        <p>
          Whether you're here to explore, contribute, or get inspired — welcome to a growing community that values simplicity, style, and sharing.
        </p>
      </motion.div>

      {/* Admin CTA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-6 py-3 rounded-full text-black font-semibold bg-gradient-to-r from-yellow-400 via-gray-300 to-orange-400 shadow-lg"
        onClick={() => navigate("/admin/login")}
      >
        Go to Admin Dashboard
      </motion.button>

      {/* Footer */}
<p className="mt-12 text-sm text-gray-600 text-center">
  Made with 💛 by Hitesh Patidar • Connect on{" "}
  <a
    href="mailto:hiteshpatidar009@gmail.com"
    className="text-yellow-400 underline mx-1"
    target="_blank"
    rel="noopener noreferrer"
  >
    Email
  </a>
  |{" "}
  <a
    href="https://www.instagram.com/hiteshpatidar009/"
    className="text-yellow-400 underline mx-1"
    target="_blank"
    rel="noopener noreferrer"
  >
    Instagram
  </a>
  |{" "}
  <a
    href="https://www.linkedin.com/in/hiteshpatidar009/"
    className="text-yellow-400 underline mx-1"
    target="_blank"
    rel="noopener noreferrer"
  >
    LinkedIn
  </a>
</p>

    </div>
  );
};

export default AboutUs;
