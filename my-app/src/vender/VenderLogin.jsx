import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          toast.warning("User not active. Please wait for admin approval.");
          return;
        }

        if (ischecked) {
          const userData = { username: uid, password: upass };
          Cookies.set("vauth", JSON.stringify(userData), { expires: 7 });
        }

        const userInfo = {
          vfname: res.data.VenderName,
          vpicname: res.data.VPicName,
          vid: res.data.Vid,
        };

        sessionStorage.setItem("vsessionauth", JSON.stringify(userInfo)); // ✅ corrected session key

        toast.success(`Welcome, ${userInfo.vfname}!`);
        navigate("/vender/dashboard", { state: userInfo });
      } else {
        toast.error("Invalid ID or Password");
      }
    }).catch(() => {
      toast.error("Server error. Please try again later.");
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

        if (res.data.Status === "Inactive") {
          toast.info("Account created. Awaiting admin approval.");
        } else {
          sessionStorage.setItem("vsessionauth", JSON.stringify(userInfo));
          toast.success(`Google Login Successful: ${userInfo.vfname}`);
          navigate("/vender/dashboard", { state: userInfo });
        }
      })
      .catch(() => {
        toast.error("Google login failed. Try again.");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-zinc-800"
    >
      <ToastContainer position="top-right" autoClose={3000} />
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
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onClick={() => setIsChecked(!ischecked)}
            />
            <span className="label-text ml-2">Remember Me</span>
          </label>
        </div>

        <button onClick={handleLoginButton} className="btn btn-success w-full mb-4">
          Login
        </button>

        <div className="text-center text-gray-400">OR</div>

        <div className="my-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google Login Failed")}
          />
        </div>

        <div className="text-center">
          <p className="mb-2">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-outline w-full"
          >
            Register
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default VenderLogin;
