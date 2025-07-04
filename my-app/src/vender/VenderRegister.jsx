import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import VenderLogin from "./VenderLogin";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function VenderReg() {
  const [vuserid, setVUserId] = useState("");
  const [vuserpass, setVUserPass] = useState("");
  const [vendername, setVenderName] = useState("");
  const [vaddress, setVAddress] = useState("");
  const [vcontact, setVContact] = useState("");
  const [vemail, setVEmail] = useState("");
  const [vpicname, setVPicName] = useState("");
  const [vid, setVId] = useState("");
   const navigate = useNavigate();
   
 
  const [displayText, setDisplayText] = useState("");
  const text = "\uD83D\uDC81\uD83C\uDFFB★  Join as a Contributor and Start Sharing Your UI Components! \uD83D\uDC81\uD83C\uDFFB★";

  useEffect(() => {
    axiosInstance
      .get("/vender/getvendercount/")
      .then((res) => {
        setVId(res.data.length + 1);
      })
      .catch((err) => {
        alert(err);
      });

    let currentText = "";
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        currentText += text.charAt(i);
        setDisplayText(currentText);
      }, i * 100);
    }
  }, []);

  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0],
    };
    setImage(img);
    setVPicName(evt.target.files[0].name);
  };



const handleSubmit = async (evt) => {
  evt.preventDefault();

  const formData = new FormData();
  formData.append("file", image);

  try {
    const res = await axiosInstance.post("/vender/savevenderimage", formData);
    if (res.status === 200) {
      setStatus("✅ File Uploaded Successfully");
    }
  } catch (err) {
    setStatus("❌ Failed to Upload File");
    console.error("Upload error:", err.message);
  }
};

  const handleRegisterButton = () => {
    const obj = {
      VUserId: vuserid,
      VUserPass: vuserpass,
      VenderName: vendername,
      VAddress: vaddress,
      VContact: vcontact,
      VEmail: vemail,
      VPicName: vpicname,
      Vid: vid,
      Status: "active",
    };

    axiosInstance
      .post("/vender/register/", obj)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleLogin = () => {
    // const root = ReactDOM.createRoot(document.getElementById("root"));
    // root.render(<VenderLogin />);

    navigate("/vender/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-800 p-6"
    >
      <div className="w-full max-w-4xl bg-zinc-900 text-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          {displayText}
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Vendor ID</label>
            <span className="text-base-content bg-zinc-800 px-4 py-2 rounded-md text-white">{vid}</span>
          </div>

          <div>
            <label className="label">User ID</label>
            <input type="text" className="input input-bordered w-full bg-zinc-800" onChange={(e) => setVUserId(e.target.value)} required />
          </div>

          <div>
            <label className="label">Password</label>
            <input type="password" className="input input-bordered w-full bg-zinc-800" onChange={(e) => setVUserPass(e.target.value)} required />
          </div>

          <div>
            <label className="label">Vendor Name</label>
            <input type="text" className="input input-bordered w-full bg-zinc-800" onChange={(e) => setVenderName(e.target.value)} required />
          </div>

          <div>
            <label className="label">Address</label>
            <input type="text" className="input input-bordered w-full bg-zinc-800" onChange={(e) => setVAddress(e.target.value)} required />
          </div>

          <div>
            <label className="label">Contact No</label>
            <input type="number" className="input input-bordered w-full bg-zinc-800" onChange={(e) => setVContact(e.target.value)} required />
          </div>

          <div>
            <label className="label">Email</label>
            <input type="email" className="input input-bordered w-full bg-zinc-800" onChange={(e) => setVEmail(e.target.value)} required />
          </div>

          {/* <div>
            <label className="label">Upload Photo</label>
            <input type="file" className="file-input file-input-bordered w-full bg-zinc-800" onChange={handleFileChange} />
            {imgae.preview && <img src={imgae.preview} alt="preview" className="mt-2 rounded-md" width="100" />}
            <button onClick={handleSubmit} className="btn btn-sm mt-2 btn-secondary">Upload Photo</button>
          </div> */}

          <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
            <button onClick={handleRegisterButton} className="btn btn-success w-full max-w-xs">Register</button>
            <button onClick={handleLogin} className="btn btn-outline w-full max-w-xs">Login</button>
          </div>
        </form>
        <p className="mt-4 text-center text-success">{status}</p>
      </div>
    </motion.div>
  );
}

export default VenderReg;
