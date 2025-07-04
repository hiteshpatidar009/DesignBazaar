import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";

const ComponentShowcase = () => {
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTabs, setActiveTabs] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchAllComponents();
  }, []);

  const fetchAllComponents = async () => {
    try {
      const res = await axiosInstance.get("/uicomponent/allcomponents");
      setComponents(res.data);
      const uniqueCats = [...new Set(res.data.map((item) => item.category))];
      setCategories(uniqueCats);
    } catch (err) {
      alert("Component Fetch Error: " + err.message);
    }
  };

  const fetchByCategory = async (cat) => {
    setActiveCategory(cat);
    if (cat === "all") {
      fetchAllComponents();
    } else {
      try {
        const res = await axiosInstance.get(`/uicomponent/category/${cat}`);
        setComponents(res.data);
      } catch (err) {
        alert("Category Filter Error: " + err.message);
      }
    }
  };

  const toggleTab = (id, tab) => {
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1000);
    });
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-white/10 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4">📚 Components</h2>
        <ul className="space-y-2">
          <motion.li
            key="all"
            onClick={() => fetchByCategory("all")}
            className={`cursor-pointer px-3 py-2 rounded transition duration-200 ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-yellow-500 via-gray-200 to-orange-500 text-black font-semibold"
                : "hover:bg-zinc-800"
            }`}
          >
            All Components
          </motion.li>
          {categories.map((cat, idx) => (
            <motion.li
              key={cat}
              onClick={() => fetchByCategory(cat)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`cursor-pointer px-3 py-2 rounded transition duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-yellow-500 via-gray-200 to-orange-500 text-black font-semibold"
                  : "hover:bg-zinc-800"
              }`}
            >
              {cat}
            </motion.li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-gray-200 to-orange-400 bg-clip-text text-transparent"
        >
          {activeCategory === "all" ? "All Components" : `${activeCategory} Components`}
        </motion.h1>

        {/* Component Cards */}
        <div className="flex flex-col items-center space-y-10">
          {components.map((comp) => {
            const currentTab = activeTabs[comp._id] || "preview";

            return (
              <motion.div
                key={comp._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900 text-white p-6 rounded-xl border border-white/10 shadow-xl w-full max-w-4xl"
              >
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-gray-200 to-orange-400 bg-clip-text text-transparent">
                  {comp.name} Component
                </h2>
                <p className="text-sm text-orange-300 mb-2">Category: {comp.category}</p>
                <p className="text-sm text-gray-400 italic mb-4">
                  📎 {comp.description || "No description provided."}
                </p>

                <div className="flex space-x-4 mb-4">
                  {['preview', 'html', 'jsx'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => toggleTab(comp._id, tab)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentTab === tab
                          ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      }`}
                    >
                      {tab === "preview" && "🔍 Preview"}
                      {tab === "html" && "💻 HTML"}
                      {tab === "jsx" && "⚛️ JSX"}
                    </button>
                  ))}
                </div>

                <div className="bg-black/40 border border-white/10 rounded-lg p-6 min-h-[120px] relative">
                  <AnimatePresence mode="wait">
                    {currentTab === "preview" && (
                      <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {comp.Imagename ? (
                          <img
                            src={comp.Imagename}
                            alt="Preview"
                            className="w-full h-56 object-contain rounded-lg border border-white/10"
                          />
                        ) : (
                          <p className="text-center">No preview available</p>
                        )}
                      </motion.div>
                    )}

                    {(currentTab === "html" || currentTab === "jsx") && (
                      <motion.div key={currentTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <pre className={`${currentTab === "html" ? "text-yellow-300" : "text-green-400"} whitespace-pre-wrap text-sm`}>
                          {currentTab === "html" ? comp.htmlCode : comp.jsxCode}
                        </pre>
                        <button
                          onClick={() => handleCopy(currentTab === "html" ? comp.htmlCode : comp.jsxCode, comp._id)}
                          className="absolute top-4 right-4 px-3 py-1 text-xs rounded-md bg-zinc-700 hover:bg-zinc-600"
                        >
                          {copiedId === comp._id ? "✅ Copied" : "📋 Copy"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ComponentShowcase;
