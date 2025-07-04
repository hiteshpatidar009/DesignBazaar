const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// ✅ Hardcoded admin credentials
const ADMIN_ID = "rohitesh";
const ADMIN_PASSWORD = "websitekabaap@123";

// ✅ Secret key for JWT (use .env in production)
const SECRET_KEY = "adminSecretKey123";

// ✅ Login route (no DB, no schema)
router.post("/login", (req, res) => {
  const { adminId, password } = req.body;

  if (adminId !== ADMIN_ID) {
    return res.status(401).json({ message: "Admin not found" });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  // ✅ Create JWT token
  const token = jwt.sign({ adminId }, SECRET_KEY, { expiresIn: "2h" });

  res.status(200).json({ message: "Login successful", token });
});

// ✅ Middleware to verify JWT token
function verifyAdminToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// ✅ Example protected route
router.get("/dashboard", verifyAdminToken, (req, res) => {
  res.json({ message: `Welcome Admin: ${req.admin.adminId}` });
});

module.exports = router;
