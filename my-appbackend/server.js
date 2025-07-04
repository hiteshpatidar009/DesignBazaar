const express = require("express");
const app=express();
const cors=require("cors");
const bodyparser=require("body-parser");
const mongoose = require("mongoose");
// const PORT = 7979;
// const config= require("./db");
const dotenv = require("dotenv");
// Load environment variables from .env
dotenv.config();

const PORT = process.env.PORT || 7979;
// import Router 
const VenderRouter = require("./Vender/vender.router");
const UIComponentRouter = require("./Uicomponet/uicomponet.router");
const Categoryrouter = require("./Admin/Category.router");
const LeaderboardRouter = require("./Admin/leaderboard.router");
const UICategoryRoute = require ("./Admin/Category.router");
const AdminRoutes = require("./Admin/Admin.router");
// app.use(cors());


app.use(cors({
  origin: "http://localhost:5173", // ✅ explicitly allow your frontend origin
  credentials: true,               // ✅ allow cookies / sessions / headers
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

// router defind
app.use("/vender", VenderRouter);
app.use("/uicomponent",UIComponentRouter);
app.use("/categoryrouter",Categoryrouter);
app.use("/leaderboard", LeaderboardRouter);
app.use("/uicategory", UICategoryRoute);
app.use("/admin", AdminRoutes);



// mongoose.connect(config.URL)
// .then(()=>{console.log("Data base is connect "+config.URL)},
//     err=>{console.log("Can not connect to the database"+err)}
// );
// app.listen(PORT,()=>{
//     console.log("server is running on Port "+PORT);

// })
// Connect to MongoDB Atlas

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Atlas connected successfully");
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});

// Start server
app.listen(PORT, () => {
  console.log("🚀 Server is running on port " + PORT);
});
