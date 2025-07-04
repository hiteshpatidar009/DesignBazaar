import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // ✅ Needed to receive state
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";


const UIComponentCURDBy = () => {
  // const location = useLocation();
  // const data = location.state; // ✅ Receive data passed via navigate
  // const vendorId = data?.venderid;
  const location = useLocation();
const data = location.state;

const vendorId = data?.venderid || sessionStorage.getItem("venderid");
const vendname = data?.vendname || sessionStorage.getItem("vendname");

  

  const [components, setComponents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (vendorId) {
      fetchVendorComponents();
    }
  }, [vendorId]);

  const fetchVendorComponents = async () => {
    try {
      const res = await axiosInstance.get(
        `/uicomponent/vendor/${vendorId}`
      );
      setComponents(res.data);
    } catch (err) {
      alert("Error fetching components: " + err.message);
    }
  };

  // (rest of your code remains unchanged...)


  const handleEdit = (comp) => {
    setEditingId(comp._id);
    setFormData({
      name: comp.name,
      category: comp.category,
      description: comp.description,
      htmlCode: comp.htmlCode,
      jsxCode: comp.jsxCode,
      Imagename: comp.Imagename,
    });
    setImageFile(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
    setImageFile(null);
  };

  const handleUpdate = async (id) => {
    try {
      let updatedForm = { ...formData, vendorId };

      if (imageFile) {
        // Upload image to ImgBB or any image API
        const imageForm = new FormData();
        imageForm.append("image", imageFile);

        const res = await axios.post(
          "https://api.imgbb.com/1/upload?key=afdfc33c8e7e803e2eba78686c8fb0ed",
          imageForm
        );
        updatedForm.Imagename = res.data.data.url;
      }

      await axiosInstance.put(
        `/uicomponent/updatecomponent/${id}`,
        updatedForm
      );
      setEditingId(null);
      fetchVendorComponents();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      try {
        await axiosInstance.delete(
          `/uicomponent/deletecomponent/${id}`
        );
        fetchVendorComponents();
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-orange-300 to-red-500 bg-clip-text text-transparent">
        🧩 Manage Your UI Components
      </h2>

      {components.length === 0 ? (
        <p className="text-center text-gray-400">
          No components found for your account.
        </p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {components.map((comp) => (
            <motion.div
              key={comp._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-zinc-900 p-6 rounded-xl border border-white/10 shadow-xl"
            >
              {editingId === comp._id ? (
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 font-semibold">
                      Component Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-zinc-800 text-white"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Category</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-zinc-800 text-white"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 rounded bg-zinc-800 text-white"
                      rows={2}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">
                      HTML Code
                    </label>
                    <textarea
                      className="w-full p-2 rounded bg-zinc-800 text-yellow-300"
                      rows={4}
                      value={formData.htmlCode}
                      onChange={(e) =>
                        setFormData({ ...formData, htmlCode: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">JSX Code</label>
                    <textarea
                      className="w-full p-2 rounded bg-zinc-800 text-green-400"
                      rows={4}
                      value={formData.jsxCode}
                      onChange={(e) =>
                        setFormData({ ...formData, jsxCode: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">
                      Component Image
                    </label>
                    {formData.Imagename && !imageFile && (
                      <img
                        src={formData.Imagename}
                        alt="Current Preview"
                        className="w-full h-48 object-contain mb-2 rounded"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full bg-zinc-800 p-2 rounded"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleUpdate(comp._id)}
                      className="bg-green-500 px-4 py-2 rounded text-black font-semibold"
                    >
                      ✅ Update
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-600 px-4 py-2 rounded text-white"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-yellow-400 via-white to-orange-400 bg-clip-text text-transparent mb-1">
                    {comp.name}
                  </h3>
                  <p className="text-orange-400 mb-2">
                    Category: {comp.category}
                  </p>
                  <p className="text-sm text-gray-300 italic mb-2">
                    {comp.description || "No description"}
                  </p>
                  {comp.Imagename && (
                    <img
                      src={comp.Imagename}
                      alt="Preview"
                      className="w-full h-56 object-contain rounded border border-white/10 mb-4"
                    />
                  )}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(comp)}
                      className="bg-blue-500 px-4 py-2 rounded text-black font-semibold"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comp._id)}
                      className="bg-red-600 px-4 py-2 rounded text-white"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UIComponentCURDBy;
