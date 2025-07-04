import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";


const UIComponentCURDAdmin = () => {
  const [components, setComponents] = useState([]);
  const [allComponents, setAllComponents] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchAllComponents();
    fetchVendors();
  }, []);

  const fetchAllComponents = () => {
    axiosInstance
      .get("/uicomponent/allcomponents")
      .then((res) => {
        setComponents(res.data);
        setAllComponents(res.data);
      })
      .catch((err) => {
        console.log("Error fetching all components:", err);
      });
  };

  const fetchVendors = () => {
    axiosInstance
      .get("/vender/all")
      .then((res) => {
        setVendors(res.data);
      })
      .catch((err) => {
        console.log("Error fetching vendors:", err);
      });
  };

  const getVendorName = (id) => {
    const vendor = vendors.find((v) => v.Vid === id);
    return vendor ? vendor.VenderName : "Unknown Vendor";
  };

 const handleVendorFilter = (e) => {
  const selectedId = e.target.value;
  setSelectedVendor(selectedId);

  if (selectedId === "all") {
    setComponents(allComponents);
  } else {
    const filtered = allComponents.filter(
      (comp) => String(comp.vendorId) === String(selectedId)
    );
    console.log("Filtered Length:", filtered.length);
    setComponents(filtered);
  }
};



  const handleEdit = (comp) => {
    setEditingId(comp._id);
    setFormData({ ...comp });
    setImageFile(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
    setImageFile(null);
  };

  const handleUpdate = async (id) => {
    try {
      let updatedForm = { ...formData };

      if (imageFile) {
        const imageForm = new FormData();
        imageForm.append("image", imageFile);

        const res = await axios.post(
          "https://api.imgbb.com/1/upload?key=afdfc33c8e7e803e2eba78686c8fb0ed",
          imageForm
        );

        if (res.data && res.data.data?.url) {
          updatedForm.Imagename = res.data.data.url;
        }
      }

      await axiosInstance.put(`/uicomponent/updatecomponent/${id}`, updatedForm);
      setEditingId(null);
      fetchAllComponents();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      try {
        await axiosInstance.delete(`/uicomponent/deletecomponent/${id}`);
        fetchAllComponents();
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
        👑 Admin - Manage All UI Components
      </h2>

      <div className="mb-6 max-w-md mx-auto">
        <label className="block mb-2 font-semibold">Filter by Vendor:</label>
<select
  className="w-full bg-zinc-800 p-2 rounded"
  value={selectedVendor}
  onChange={handleVendorFilter}
>
    <option value="all">All Vendors</option>
  {vendors.map((vendor) => (
    <option key={vendor._id} value={vendor._id}>
      {vendor.VenderName}
    </option>
  ))}
</select>
      </div>

      {components.length === 0 ? (
        <p className="text-center text-gray-400">No components available.</p>
      ) : (
        <div className="space-y-6 max-w-6xl mx-auto">
          {components.map((comp) => (
            <motion.div
              key={comp._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-zinc-900 p-6 rounded-xl border border-white/10 shadow-xl"
            >
              <div className="text-sm text-gray-400 mb-2">
                Vendor: <span className="text-white">{getVendorName(comp.vendorId)}</span> | Vendor ID:{" "}
                <span className="text-pink-400">{comp.vendorId}</span>
              </div>

              {editingId === comp._id ? (
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Component Name"
                    className="w-full p-2 rounded bg-zinc-800 text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Category"
                    className="w-full p-2 rounded bg-zinc-800 text-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />

                  <textarea
                    placeholder="Description"
                    className="w-full p-2 rounded bg-zinc-800 text-white"
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />

                  <textarea
                    placeholder="HTML Code"
                    className="w-full p-2 rounded bg-zinc-800 text-yellow-300"
                    rows={4}
                    value={formData.htmlCode}
                    onChange={(e) => setFormData({ ...formData, htmlCode: e.target.value })}
                  />

                  <textarea
                    placeholder="JSX Code"
                    className="w-full p-2 rounded bg-zinc-800 text-green-400"
                    rows={4}
                    value={formData.jsxCode}
                    onChange={(e) => setFormData({ ...formData, jsxCode: e.target.value })}
                  />

                  <div>
                    <label className="block mb-1 font-semibold">Component Image</label>
                    {formData.Imagename && !imageFile && (
                      <img
                        src={formData.Imagename}
                        alt="Current"
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
                  <p className="text-pink-400 mb-2">Component Category: {comp.category}</p>
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

export default UIComponentCURDAdmin;
