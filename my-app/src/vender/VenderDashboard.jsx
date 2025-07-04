

import React, { useEffect, useState } from "react";
import { AlertTriangle, Camera, Code, CheckCircle, Info, X, Plus, Edit, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";



function VenderDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [vendName, setVendName] = useState(data?.vfname || "");
  const [venderId, setVenderId] = useState(data?.vid || "");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("vsessionauth");
    alert("Vendor session closed");
    navigate("/vender/login");
  };

  const proceedToComponentRegister = () => {
    const passObj = { vendname: vendName, venderid: venderId };
    navigate("/component-register", { state: passObj });
    setShowDisclaimer(false);
    setAcknowledged(false);
  };

  const handleAddComponent = () => {
    setShowDisclaimer(true);
  };

 const handleEditComponent = () => {
  const passObj = { vendname: vendName, venderid: venderId };
  // Save to session storage
  sessionStorage.setItem("venderid", venderId);
  sessionStorage.setItem("vendname", vendName);
  navigate("/curd-by-dev", { state: passObj });
};





  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    setAcknowledged(false);
  };

  const imageGuidelines = [
    {
      title: "Optimal Dimensions",
      content: "1200x800px (3:2 ratio) for best display across all devices",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "File Size",
      content: "Maximum 2MB per image for fast loading",
      icon: <Info className="w-5 h-5" />
    },
    {
      title: "Formats",
      content: "PNG, JPG, JPEG, WebP, GIF supported",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      title: "Quality",
      content: "High resolution screenshots showing component clearly",
      icon: <Info className="w-5 h-5" />
    }
  ];

  const codeRequirements = [
    "Clean, well-formatted HTML/JSX code",
    "No malicious scripts or harmful content",
    "Properly structured and functional components",
    "Include necessary CSS classes and styling",
    "Test your code before submission"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-800 text-white p-6"
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-white to-orange-400 bg-clip-text text-transparent">
              Welcome, {vendName}
            </h1>
            <p className="text-lg text-zinc-300 mt-2">
              Vendor ID: <span className="text-orange-400 font-mono">{venderId}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div onClick={handleAddComponent} className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 rounded-lg p-6 text-center">
            <Plus className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">Register Component</h3>
          </div>

          <div onClick={handleEditComponent} className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 rounded-lg p-6 text-center">
            <Edit className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <h3 className="text-xl font-semibold text-green-300">Edit Components</h3>
          </div>

          <div onClick={handleLogout} className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 rounded-lg p-6 text-center">
            <LogOut className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <h3 className="text-xl font-semibold text-orange-300">Logout</h3>
          </div>
        </div>
      </div>

      {showDisclaimer && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
    <div className="bg-zinc-900 rounded-xl w-full max-w-3xl max-h-[85vh] p-6 overflow-y-auto border border-gray-700">
      <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-6 sticky top-0 bg-zinc-900 z-10">
        <h2 className="text-xl font-bold text-yellow-400 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2" /> Component Upload Guidelines
        </h2>
        <button onClick={handleCloseDisclaimer}>
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Image Guidelines */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-3">Image Requirements</h3>
          {imageGuidelines.map((g, i) => (
            <div key={i} className="flex items-start mb-2">
              <div className="mr-3 mt-1">{g.icon}</div>
              <div>
                <p className="text-white font-semibold">{g.title}</p>
                <p className="text-gray-400 text-sm">{g.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Code Guidelines */}
        <div>
          <h3 className="text-lg font-semibold text-green-300 mb-3">Code Standards</h3>
          {codeRequirements.map((r, i) => (
            <div key={i} className="flex items-start mb-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 mr-2" />
              <p className="text-gray-300 text-sm">{r}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="bg-red-900/20 p-4 rounded-md border border-red-500">
          <h3 className="text-red-300 font-semibold text-lg mb-2">Important Notes</h3>
          <ul className="list-disc list-inside text-sm text-gray-300">
            <li>Only upload your original components</li>
            <li>Don't upload harmful or broken code</li>
            <li>Max image size: 2MB (PNG, JPG, GIF)</li>
            <li>Code should be readable and tested</li>
            <li>You must check the box to proceed</li>
          </ul>
        </div>

        {/* Acknowledgement */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mr-3 w-5 h-5"
          />
          <span className="text-gray-300">I understand and agree to follow all upload rules.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          <button onClick={handleCloseDisclaimer} className="btn btn-outline mr-4">Cancel</button>
          <button
            disabled={!acknowledged}
            onClick={proceedToComponentRegister}
            className="btn btn-primary"
          >
            🚀 Proceed to Upload
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </motion.div>
  );
}

export default VenderDashboard;
