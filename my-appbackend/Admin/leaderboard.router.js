const express = require("express");
const router = express.Router();
const UIComponent = require("../Uicomponet/uicomponet.model");
const Vender = require("../Vender/vender.model"); 

// 🔥 GET Top 10 Vendors by Approved Components
router.get("/top", async (req, res) => {
  try {
    const topContributors = await UIComponent.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: "$vendorId", approvedCount: { $sum: 1 } } },
      { $sort: { approvedCount: -1 } },
      { $limit: 10 },
    ]);

    // Safely fetch vendor names using Vid as a number
    const vendorData = await Promise.all(
      topContributors.map(async (entry) => {
        try {
          const vendor = await Vender.findOne({ Vid: Number(entry._id) });

          if (!vendor) {
            console.warn("⚠️ Vendor not found for ID:", entry._id);
          }

          return {
            vendorId: entry._id,
            vendorName: vendor?.VenderName || "Unknown",
            approvedCount: entry.approvedCount,
          };
        } catch (innerErr) {
          console.error("❌ Error fetching vendor:", innerErr);
          return {
            vendorId: entry._id,
            vendorName: "Error",
            approvedCount: entry.approvedCount,
          };
        }
      })
    );

    res.status(200).json(vendorData);
  } catch (err) {
    console.error("🔥 Leaderboard Error:", err);
    res.status(500).json({
      message: "Error generating leaderboard",
      error: err.message,
    });
  }
});

module.exports = router;
