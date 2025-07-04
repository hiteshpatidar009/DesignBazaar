import React, { useState, useEffect } from "react";

import axiosInstance from "../api/axiosInstance";

function VendorMgt() {
  const [vendorList, setVendorList] = useState([]);

  const fetchVendors = () => {
    axiosInstance
      .get("/vender/getvendercount")
      .then((res) => setVendorList(res.data))
      .catch((err) => alert("Error fetching vendors: " + err.message));
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const updateStatus = (vid, status) => {
    axiosInstance
      .put(`/vender/vendermanage/${vid}/${status}`)
      .then((res) => {
        alert(res.data);
        fetchVendors();
      })
      .catch((err) => alert("Status update error: " + err.message));
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 via-orange-300 to-red-500 bg-clip-text text-transparent">
          🧑‍💼 Vendor Management Panel
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10 shadow-lg">
          <table className="table w-full bg-zinc-800 text-white">
            <thead className="bg-zinc-700 text-white">
              <tr>
                <th className="text-left">Vendor ID</th>
                <th className="text-left">Vendor Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendorList.map((vendor) => (
                <tr key={vendor.Vid}>
                  <td className="text-left">{vendor.Vid}</td>
                  <td className="text-left">{vendor.VenderName}</td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        vendor.Status === "Active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {vendor.Status}
                    </span>
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => updateStatus(vendor.Vid, "Active")}
                    >
                      Activate
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => updateStatus(vendor.Vid, "Inactive")}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
              {vendorList.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
                    No vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorMgt;
