import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function ComponentRegister({ data }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [jsxCode, setJsxCode] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  
   const location = useLocation();
   const stateData = location.state;
   const vendorId = stateData?.venderid || sessionStorage.getItem("venderid");

  useEffect(() => {
    axiosInstance
      .get("/uicategory/all")
      .then((res) => {
        setCategories(res.data);
        console.log("Fetched categories:", res.data); // For debugging
      })
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadToImgBB = async () => {
    const apiKey = "afdfc33c8e7e803e2eba78686c8fb0ed";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.data.url;
    } catch (err) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleComponentSubmit = async () => {
    if (!name || !category || !htmlCode || !jsxCode || !imageFile) {
      toast.error("All fields are required");
      return;
    }

    const imageUrl = await uploadToImgBB();
    if (!imageUrl) return;

    const payload = {
      name,
      category,
      htmlCode,
      jsxCode,
      description,
      Imagename: imageUrl,
      vendorId: vendorId,
      status: "approved",
    };

    try {
      await axiosInstance.post("/uicomponent/addcomponent", payload);
      toast.success("✅ Component registered!");
      setName("");
      setCategory("");
      setHtmlCode("");
      setJsxCode("");
      setDescription("");
      setImageFile(null);
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-zinc-900 text-white px-6 py-10"
    >
      <Toaster />
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-yellow-400 via-white to-orange-400 bg-clip-text text-transparent"
        >
          ✨ Register New UI Component ✨
        </motion.h2>

        <div className="bg-zinc-800 rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Component Name</label>
              <input
                type="text"
                className="input input-bordered w-full bg-zinc-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Select Category</label>
              <select
                className="select w-full bg-zinc-900"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Choose Category
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.PCatgName}>
                    {cat.PCatgName}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="label">HTML Code</label>
              <textarea
                className="textarea textarea-bordered w-full bg-zinc-900 text-yellow-200"
                rows={4}
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="label">JSX Code</label>
              <textarea
                className="textarea textarea-bordered w-full bg-zinc-900 text-green-300"
                rows={4}
                value={jsxCode}
                onChange={(e) => setJsxCode(e.target.value)}
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="label">Description</label>
              <textarea
                className="textarea textarea-bordered w-full bg-zinc-900 text-white"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="label">Preview Image</label>
              <input
                type="file"
                accept="image/*"
                className="file-input w-full bg-zinc-900"
                onChange={handleImageChange}
              />
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="rounded-lg mt-3 border border-white/20 shadow-md w-40"
                />
              )}
            </div>

            <div className="md:col-span-2 mt-6 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-success px-10 text-lg font-semibold shadow-lg"
                onClick={handleComponentSubmit}
              >
                🚀 Submit Component
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ComponentRegister;
