import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CategoryPage from "./Category";
import UIComponentCRUD from "./UIComponentCURDAdmin";
import VendorMgt from "./VenderMgt";

const tabs = [
  { id: "dashboard", label: "🏠 Dashboard" },
  { id: "category", label: "📂 Category Page" },
  { id: "uicrud", label: "🧩 UI Component CRUD" },
  { id: "vendor", label: "🏭 Vendor Management" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // or sessionStorage.clear()
    navigate("/admin/login"); // redirect to login
  };

  const renderContent = () => {
    switch (activeTab) {
      case "category":
        return <CategoryPage />;
      case "uicrud":
        return <UIComponentCRUD />;
      case "vendor":
        return <VendorMgt />;
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center p-10"
          >
            <h1 className="text-4xl font-extrabold text-cyan-400 animate-pulse">
              👋 Welcome Admin!
            </h1>
            <p className="mt-4 text-gray-300">
              Use the sidebar to manage your application.
            </p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-lg border-r border-gray-700 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400 tracking-wider">
              ⚙️ Admin Panel
            </h2>
            <ul className="space-y-3">
              {tabs.map((tab) => (
                <motion.li
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer rounded-lg px-4 py-3 transition-all duration-300 font-medium ${
                    activeTab === tab.id
                      ? "bg-cyan-500 text-black shadow-md"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  {tab.label}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="mt-10 w-full bg-red-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            🔓 Logout
          </motion.button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl shadow-lg bg-white/5 backdrop-blur-md border border-gray-700 p-6"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
