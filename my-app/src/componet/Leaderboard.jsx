import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";
import { FaMedal, FaCrown, FaTrophy } from "react-icons/fa";

// Custom loader
const LoadingScreen = () => (
  <div className="flex justify-center items-center h-[300px] sm:h-[400px]">
    <span className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-gray-300 to-orange-400 animate-pulse">
      Loading...
    </span>
  </div>
);

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/leaderboard/top")
      .then((res) => {
        setLeaders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setLeaders([]);
        setLoading(false);
      });
  }, []);

  

  const getIcon = (rank) => {
    if (rank === 0) return <FaCrown className="text-3xl sm:text-4xl text-yellow-400" />;
    if (rank === 1) return <FaMedal className="text-2xl sm:text-3xl text-slate-300" />;
    if (rank === 2) return <FaMedal className="text-2xl sm:text-3xl text-orange-400" />;
    return <FaTrophy className="text-lg sm:text-xl text-pink-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-yellow-300 via-pink-500 to-red-500 bg-clip-text text-transparent"
      >
        🏆 Top Contributors Leaderboard
      </motion.h1>

      {loading ? (
        <LoadingScreen />
      ) : leaders.length === 0 ? (
        <p className="text-center text-gray-400">No leaderboard data available.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.vendorId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className={`rounded-2xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-white/10 bg-gradient-to-r from-zinc-800 via-zinc-900 to-black hover:scale-[1.02] duration-300 ${
                index === 0 ? "ring-2 ring-yellow-400 shadow-yellow-600/30" : ""
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {getIcon(index)}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    {leader.vendorName}
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-lg sm:text-xl font-bold text-amber-300">
                  {leader.approvedCount} Components
                </p>
                <p className="text-sm text-gray-400">Contributions</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
