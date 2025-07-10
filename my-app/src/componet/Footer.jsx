import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // import X (Twitter) icon

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white py-12 px-6 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Logo & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="flex justify-center md:justify-start items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold shadow-md">
              DB
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-gray-300 to-orange-400 bg-clip-text text-transparent">
              DesignBazaar
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-400 max-w-xs mx-auto md:mx-0">
            Empowering developers to build and share beautiful UI components.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col space-y-2 text-sm"
        >
          <h4 className="font-semibold text-white mb-2">Quick Links</h4>
          <button onClick={() => navigate('/')} className="hover:text-yellow-400 transition">Home</button>
          <button onClick={() => navigate('/Mainpage')} className="hover:text-yellow-400 transition">Components</button>
          <button onClick={() => navigate('/about')} className="hover:text-yellow-400 transition">About Us</button>
          <button onClick={() => navigate('/register')} className="hover:text-yellow-400 transition">Become a Contributor</button>
        </motion.div>

        {/* Social & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col space-y-3 text-sm"
        >
          <h4 className="font-semibold text-white mb-2">Connect</h4>
          <a href="mailto:hiteshpatidar009@gmail.com" className="flex justify-center md:justify-start items-center gap-2 text-gray-400 hover:text-yellow-400 transition">
            <FaEnvelope /> Email
          </a>
          <a href="https://www.instagram.com/hitesh_patidar_1" target="_blank" rel="noopener noreferrer" className="flex justify-center md:justify-start items-center gap-2 text-gray-400 hover:text-yellow-400 transition">
            <FaInstagram /> Instagram
          </a>
          <a href="https://x.com/hiteshpatidar_1" target="_blank" rel="noopener noreferrer" className="flex justify-center md:justify-start items-center gap-2 text-gray-400 hover:text-yellow-400 transition">
            <FaXTwitter /> Twitter (X)
          </a>
          <a href="https://www.linkedin.com/in/hiteshpatidar009/" target="_blank" rel="noopener noreferrer" className="flex justify-center md:justify-start items-center gap-2 text-gray-400 hover:text-yellow-400 transition">
            <FaLinkedin /> LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DesignBazaar. Built with 💛 by Hitesh Patidar.
      </div>
    </footer>
  );
};

export default Footer;
