// const express= require("express");
// const venderRoute =express.Router();
// const bodyparser=require("body-parser");
// const Vender = require ("./vender.model");
// var  fs = require("fs");
// const multer = require("multer");

// // vender registration code 

// venderRoute.route("/register").post((req,res)=>{
//     var vender = new Vender(req.body);
//     vender.save().then((vender)=>{
//         if(vender!==null){
//             res.send("Registration Succesfull")

//         }else{
//             res.send("Registration Failed")
//         }
//     }).catch((err)=>{
//         res.status(400).send("Registration Failed")
//     });

// })

// //Login 

// venderRoute.route("/login").post((req,res)=>{
//     var id=req.body.vuid;
//     var pass=req.body.vupass;
    
//     // console.log("userid="+id+"password="+pass);
//     Vender.findOne({$and:[{"VUserId":id},{"VUserPass":pass}]}).then((vender)=>{
        
//         res.send(vender);
//         res.end();

//     }).catch(err=>{
//         res.send("Something Went Wrong"+err);
//         res.end();

//     })
// })





// // Get Image 

// venderRoute.route('/getimage/:vpicname').get((req,res)=>{
    
//         res.sendFile("/Users/apple/Documents/Project.js/NexBuy-Project/backend/server-app/vender/venderimg/" + req.params.vpicname);
   
//     })

// // image save

// const st = multer.diskStorage
// ({
//     destination:(req,file,cb)=>{
//         cb(null ,"/Users/apple/Documents/Project.js/NexBuy-Project/backend/server-app/vender/venderimg/" )
//     },
//     filename:(req , file ,cb)=>{
//         cb(null ,file.originalname)
//     },
    
// })
// const upload = multer({ storage:st});

// venderRoute.post("/savevenderimage", upload.single("file"), (req, res) => {
//     console.log('');
//     res.send("File Uploaded Successfully");
//     res.end();

// });




// // get  vender for count 

// venderRoute.route("/getvendercount").get((req,res)=>{
//     Vender.find().then(vender=>{
//         res.send(vender);
//         res.end();

//     }).catch(err=>{
//         res.send("Something Went Wrong ");
//         res.end();

//     })
// })

// // ✅ GET all vendors
// venderRoute.get("/all", async (req, res) => {
//   const vendors = await Vender.find(); // Replace with your model
//   res.send(vendors);
// });


// // enable disable vender by admin 

// venderRoute.route("/vendermanage/:vid/:status").put((req,res)=>{
//     Vender.updateOne({"Vid":req.params.vid},{ Status: req.params.status }).then(vender=>{
//         res.send("Vender Status Updated Successfully");
//         res.end();
//     }).catch((err)=>{
//         res.send(err);
//         res.end();


//     })
// });
// module.exports=venderRoute;


// backend/routes/venderRoute.js

const express = require("express");
const venderRoute = express.Router();
const bodyparser = require("body-parser");
const Vender = require("./vender.model");
const fs = require("fs");
const multer = require("multer");

// Register vendor with validation
venderRoute.route("/register").post(async (req, res) => {
  const { VUserId, VUserPass, VenderName, VAddress, VContact, VEmail, VPicName } = req.body;

  // ✅ Step 1: Validate inputs
  if (!VUserId || !VUserPass || !VenderName || !VContact || !VEmail) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // ✅ Step 2: Check if user already exists
    const existing = await Vender.findOne({ VEmail });
    if (existing) {
      return res.status(400).send("User already exists.");
    }

    // ✅ Step 3: Create and save new vendor
    const newVender = new Vender({
      VUserId,
      VUserPass,
      VenderName,
      VAddress,
      VContact,
      VEmail,
      VPicName,
      Status: "Active", // or "inactive" if you want admin approval
    });

    await newVender.save();
    res.status(200).send("Registration Successful");

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Server Error. Try again later.");
  }
});

// Login vendor
venderRoute.route("/login").post((req, res) => {
  const { vuid, vupass } = req.body;
  Vender.findOne({ $and: [{ VUserId: vuid }, { VUserPass: vupass }] })
    .then((vender) => {
      res.send(vender);
    })
    .catch((err) => {
      res.send("Something Went Wrong" + err);
    });
});

// Google OAuth registration/login
venderRoute.post("/google-register", async (req, res) => {
  const { VenderName, VEmail, VPicName, VUserId, VPassword, Status } = req.body;

   
  try {
    let user = await Vender.findOne({ VUserId });

    if (!user) {
      const newUser = new Vender({
        VenderName,
        VEmail,
        VPicName,
        VUserId,
        VUserPass: VPassword,
        Status,
      });
      user = await newUser.save();
    }

    res.json(user);
  } catch (err) {
    console.error("Google register/login error:", err);
    res.status(500).send("Something went wrong.");
  }
});

// Serve vendor image
venderRoute.route("/getimage/:vpicname").get((req, res) => {
  const imgPath =
    "/Users/apple/Documents/Project.js/NexBuy-Project/backend/server-app/vender/venderimg/" +
    req.params.vpicname;
  res.sendFile(imgPath);
});

// Upload vendor image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/Users/apple/Documents/Project.js/NexBuy-Project/backend/server-app/vender/venderimg/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

venderRoute.post("/savevenderimage", upload.single("file"), (req, res) => {
  res.send("File Uploaded Successfully");
});

// Get vendor count
venderRoute.route("/getvendercount").get((req, res) => {
  Vender.find()
    .then((vendors) => {
      res.send(vendors);
    })
    .catch((err) => {
      res.send("Something Went Wrong");
    });
});

// Get all vendors
venderRoute.get("/all", async (req, res) => {
  const vendors = await Vender.find();
  res.send(vendors);
  
});

// Enable/Disable vendor (admin)
venderRoute.route("/vendermanage/:vid/:status").put((req, res) => {
  Vender.updateOne({ Vid: req.params.vid }, { Status: req.params.status })
    .then(() => {
      res.send("Vender Status Updated Successfully");
    })
    .catch((err) => {
      res.send(err);
    });
});



// POST /vender/google-register
venderRoute.post("/google-register", async (req, res) => {
  const { VUserId, VUserPass, VenderName, VEmail, VPicName, Status } = req.body;

  try {
    let existingUser = await Vender.findOne({ VEmail });

    if (existingUser) {
      return res.json(existingUser); // already registered
    }

    const newVender = new Vender({
      VUserId,
      VUserPass,
      VenderName,
      VEmail,
      VPicName,
      Status: Status || "Active", // you can use "Pending" too
    });

    await newVender.save();

    res.json({
      VenderName: newVender.VenderName,
      VEmail: newVender.VEmail,
      VPicName: newVender.VPicName,
      Vid: newVender.Vid, // ✅ Auto-generated
      Status: newVender.Status,
    });

  } catch (err) {
    console.error("Google Register Error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});
venderRoute.get("/vendor/:vendorId", async (req, res) => {
  const { vendorId } = req.params;
  const components = await UIComponent.find({ vendorId });
  res.json(components);
});


module.exports = venderRoute;
