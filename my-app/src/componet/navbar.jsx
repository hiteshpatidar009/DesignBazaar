import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  // Update active link based on current URL
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("register")) setActiveLink("Contributor");
    else if (path.includes("leaderboard")) setActiveLink("Leaderboard");
    else if (path.includes("about")) setActiveLink("About Us");
    else if (path.includes("Mainpage") || path === "/") setActiveLink("Components");
    else setActiveLink('');
  }, [location]);

  const navItems = [
    { id: 'Components', label: 'Components', icon: '👑', path: '/Mainpage' },
    { id: 'Contributor', label: 'Contributor', icon: '🌟', path: '/vender/login' },
    { id: 'Leaderboard', label: 'Leaderboard', icon: '🏪', path: '/leaderboard' },
    { id: 'About Us', label: 'About Us', icon: '🤝', path: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="w-full px-6 py-4 bg-black text-white border-b border-white/10 shadow-xl backdrop-blur-xl z-50 fixed top-0 left-0"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-md"
          >
            <span className="text-black font-bold text-sm">DB</span>
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-gray-300 to-orange-400 bg-clip-text text-transparent">
            DesignBazaar
          </span>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="relative px-4 py-1.5 text-sm font-semibold rounded-full overflow-hidden border border-white/10 shadow-lg text-white"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active background */}
              {activeLink === item.id && (
                <motion.div
                  layoutId="active-button"
                  className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-yellow-400 via-gray-300 to-orange-400 blur-sm"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-white/10 to-orange-500/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <span className="relative z-10 flex items-center gap-2 px-1">
                <span className="text-lg">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
