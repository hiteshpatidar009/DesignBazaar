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

    // Fetch vendor names
    const vendorData = await Promise.all(
      topContributors.map(async (entry) => {
        const vendor = await Vender.findOne({ Vid: entry._id });
        return {
          vendorId: entry._id,
          vendorName: vendor?.VenderName || "Unknown",
          approvedCount: entry.approvedCount,
        };
      })
    );

    res.json(vendorData);
  } catch (err) {
    res.status(500).send("Error generating leaderboard");
  }
});

module.exports = router;
