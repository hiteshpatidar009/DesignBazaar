import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";

const ComponentList = () => {
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCatg, setSelectedCatg] = useState("all");
  const [activeTabs, setActiveTabs] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      const res = await axiosInstance.get("/uicomponent/allcomponents");
      setComponents(res.data);
      const uniqueCats = [...new Set(res.data.map((item) => item.category))];
      setCategories(uniqueCats);
    } catch (err) {
      alert("Component Fetch Error: " + err.message);
    }
  };

  const handleCategoryChange = async (e) => {
    const catg = e.target.value;
    setSelectedCatg(catg);

    if (catg === "all") {
      fetchComponents();
    } else {
      try {
        const res = await axiosInstance.get(`/uicomponent/category/${catg}`);
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
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-yellow-400 via-orange-300 to-red-500 bg-clip-text text-transparent">
        🌟 UI Component Showcase
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedCatg}
          onChange={handleCategoryChange}
          className="bg-zinc-800 text-white px-5 py-2 rounded-lg border border-white/20"
        >
          <option value="all">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

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
              {/* Title & Category */}
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-gray-200 to-orange-400 bg-clip-text text-transparent">
                {comp.name} Component
              </h2>
              <p className="text-sm text-orange-300 mb-2">Category: {comp.category}</p>
              <p className="text-sm text-gray-400 italic mb-4">
                📎 {comp.description || "No description provided."}
              </p>

              {/* Tab Nav */}
              <div className="flex space-x-4 mb-4">
                {["preview", "html", "jsx"].map((tab) => (
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

              {/* Tab Content */}
              <div className="bg-black/40 border border-white/10 rounded-lg p-6 min-h-[120px] relative">
                <AnimatePresence mode="wait">
                  {currentTab === "preview" && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {comp.Imagename ? (
                        <img
                          src={comp.Imagename} // 🔁 ImgBB public URL here
                          alt="Preview"
                          className="w-full h-56 object-contain rounded-lg border border-white/10"
                        />
                      ) : (
                        <p className="text-center">No preview available</p>
                      )}
                    </motion.div>
                  )}

                  {(currentTab === "html" || currentTab === "jsx") && (
                    <motion.div
                      key={currentTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <pre
                        className={`${
                          currentTab === "html" ? "text-yellow-300" : "text-green-400"
                        } whitespace-pre-wrap text-sm`}
                      >
                        {currentTab === "html" ? comp.htmlCode : comp.jsxCode}
                      </pre>
                      <button
                        onClick={() =>
                          handleCopy(currentTab === "html" ? comp.htmlCode : comp.jsxCode, comp._id)
                        }
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
    </div>
  );
};

export default ComponentList;
