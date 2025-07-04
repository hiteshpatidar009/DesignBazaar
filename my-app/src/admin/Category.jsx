import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

function ComponentCategory() {
  const [pcatgid, setPCatgId] = useState("");
  const [pcatgname, setPCatgName] = useState("");
  const [feature, setFeature] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showCategory, setShowCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categoryrouter/all");
      setCategories(res.data);
      setPCatgId("CAT" + (res.data.length + 1));
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!pcatgname) {
      toast.error("Category name required");
      return;
    }

    const payload = { PCatgId: pcatgid, PCatgName: pcatgname, feature };

    try {
      if (editId) {
        await axiosInstance.put(`/categoryrouter/update/${editId}`, payload);
        toast.success("Category updated");
      } else {
        await axiosInstance.post("/categoryrouter/add", payload);
        toast.success("Category created");
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      toast.error("Save failed");
    }
  };

  const resetForm = () => {
    setPCatgName("");
    setFeature(false);
    setEditId(null);
    setShowCategory(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setPCatgId(cat.PCatgId);
    setPCatgName(cat.PCatgName);
    setFeature(cat.feature || false);
    setEditId(cat._id);
    setShowCategory(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axiosInstance.delete(`/categoryrouter/delete/${id}`);
      toast.success("Deleted");
      fetchCategories();
    } catch (err) {
      toast.error("Delete error");
    }
  };

  const toggleFeature = async (id) => {
    try {
      await axiosInstance.put(`/categoryrouter/feature/${id}`);
      fetchCategories();
    } catch (err) {
      toast.error("Toggle failed");
    }
  };

  const handleShow = (cat) => {
    setShowCategory(cat);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-zinc-800 text-white p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster />
      <div className="max-w-5xl mx-auto bg-zinc-900 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
          🗂️ Component Category Management
        </h2>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="label">Category ID</label>
            <input
              type="text"
              className="input input-bordered w-full bg-zinc-800"
              value={pcatgid}
              disabled
            />
          </div>

          <div>
            <label className="label">Category Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-zinc-800"
              value={pcatgname}
              onChange={(e) => setPCatgName(e.target.value)}
            />
          </div>

          <div className="md:col-span-2 flex items-center space-x-3">
            <input
              type="checkbox"
              className="checkbox checkbox-accent"
              checked={feature}
              onChange={() => setFeature(!feature)}
            />
            <span className="text-sm">Enable as Featured Category</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button className="btn btn-success" onClick={handleSubmit}>
            {editId ? "Update" : "Add"} Category
          </button>
          <button className="btn btn-warning" onClick={resetForm}>
            Reset
          </button>
        </div>

        {/* Show selected */}
        {showCategory && (
          <div className="mb-6 p-4 bg-black/30 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold text-orange-400 mb-2">
              📌 Selected Category Detail
            </h3>
            <p><strong>ID:</strong> {showCategory.PCatgId}</p>
            <p><strong>Name:</strong> {showCategory.PCatgName}</p>
            <p><strong>Feature:</strong> {showCategory.feature ? "✅ On" : "❌ Off"}</p>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full text-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Feature</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.PCatgId}</td>
                  <td>{cat.PCatgName}</td>
                  <td>
                    <button
                      className={`btn btn-xs ${cat.feature ? "btn-success" : "btn-outline"}`}
                      onClick={() => toggleFeature(cat._id)}
                    >
                      {cat.feature ? "On" : "Off"}
                    </button>
                  </td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    <button className="btn btn-sm btn-info" onClick={() => handleShow(cat)}>
                      Show
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(cat)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(cat._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-400 py-4">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default ComponentCategory;
