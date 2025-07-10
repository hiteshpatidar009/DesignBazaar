import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";

function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!adminId || !password) {
      alert("Please enter both Admin ID and Password");
      return;
    }

    try {
      const res = await axiosInstance.post("/admin/login", {
        adminId,
        password,
      });

      // ✅ Store JWT token
      sessionStorage.setItem("adminToken", res.data.token);
      sessionStorage.setItem("adminId", res.data.adminId);
      

      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-3xl text-center font-bold mb-6 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
          🛡️ Admin Login
        </h2>

        <div className="mb-4">
          <label className="font-semibold">Admin ID</label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="Enter Admin ID"
            className="input input-bordered w-full bg-zinc-800 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="input input-bordered w-full bg-zinc-800 text-white"
          />
        </div>

        <button onClick={handleLogin} className="btn btn-success w-full">
          Login
        </button>
      </div>
    </motion.div>
  );
}

export default AdminLogin;
