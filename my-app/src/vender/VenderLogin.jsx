import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";

function VenderLogin() {
  const [uid, setUId] = useState("");
  const [upass, setUPass] = useState("");
  const [ischecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mycookies = Cookies.get("vauth");
    if (mycookies !== undefined) {
      const obj = JSON.parse(mycookies);
      setUId(obj.username);
      setUPass(obj.password);
    }
  }, []);

  const handleLoginButton = () => {
    const obj = { vuid: uid, vupass: upass };

     axiosInstance.post("/vender/login", obj).then((res) => {
      if (res.data.VUserId !== undefined) {
        if (res.data.Status === "Inactive") {
          alert("User Not Active. Please wait for admin activation.");
          return;
        }

        if (ischecked) {
          const userData = { username: uid, password: upass };
          Cookies.set("vauth", JSON.stringify(userData), { expires: 7 });
        }

        sessionStorage.setItem("vsessionauth", JSON.stringify({ vuserfullname: res.data.VenderName }));

        const userInfo = {
          vfname: res.data.VenderName,
          vpicname: res.data.VPicName,
          vid: res.data.Vid,
        };

        alert("Login Successful " + userInfo.vfname);
        navigate("/vender/dashboard", { state: userInfo });
      } else {
        alert("Invalid Id/Password");
      }
    });
  };

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    const googleUser = {
      VenderName: decoded.name,
      VEmail: decoded.email,
      VUserId: decoded.email,
      VUserPass: decoded.sub,
      VPicName: decoded.picture,
      Status: "Inactive",
    };

     axiosInstance.post("/vender/google-register", googleUser)
      .then((res) => {
        const userInfo = {
          vfname: res.data.VenderName,
          vpicname: res.data.VPicName,
          vid: res.data.Vid,
        };

        if (res.data.Status === "active") {
          alert("User created but awaiting admin approval.");
        } else {
          alert("Google Login Successful: " + userInfo.vfname);
          navigate("/vender/dashboard", { state: userInfo });
        }
      })
      .catch((err) => {
        console.error("Google login error", err);
        alert("Login failed. Try again.");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-zinc-800"
    >
      <div className="bg-zinc-900 text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          🤖👨‍💻 Contributor Login 👨‍💻🤖
        </h2>

        <div className="mb-4">
          <label className="label font-semibold">User Id</label>
          <input
            type="text"
            value={uid}
            onChange={(e) => setUId(e.target.value)}
            className="input input-bordered w-full bg-zinc-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="label font-semibold">Password</label>
          <input
            type="password"
            value={upass}
            onChange={(e) => setUPass(e.target.value)}
            className="input input-bordered w-full bg-zinc-800 text-white"
          />
        </div>

        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <input type="checkbox" className="checkbox checkbox-primary" onClick={() => setIsChecked(!ischecked)} />
            <span className="label-text ml-2">Remember Me</span>
          </label>
        </div>

        <button onClick={handleLoginButton} className="btn btn-success w-full mb-4">Login</button>

        <div className="text-center text-gray-400">OR</div>

        <div className="my-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google Login Failed")}
          />
        </div>

        <div className="text-center">
          <p className="mb-2">Don't have an account?</p>
          <button onClick={() => navigate("/register")} className="btn btn-outline w-full">Register</button>
        </div>
      </div>
    </motion.div>
  );
}

export default VenderLogin;
