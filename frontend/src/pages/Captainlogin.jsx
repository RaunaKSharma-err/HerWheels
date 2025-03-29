import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CapatainContext";
import { Mail, Lock } from "lucide-react"; // lucide icons

const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );
      if (response.status === 200) {
        const { captain, token } = response.data;
        setCaptain(captain);
        localStorage.setItem("token", token);
        navigate("/captain-home");
      } else {
        console.error("Login failed with status:", response.status);
        // Handle non-200 logout response (e.g., show error message)
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Handle login error (e.g., show error message to the user)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-100 to-purple-100 animated-gradient relative overflow-hidden">
      <div className="mockup-phone z-10">
        <div className="mockup-phone-camera"></div>
        <div className="mockup-phone-display bg-white h-[92vh] rounded-4xl flex flex-col justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold text-pink-600 mb-6 animate-pulse">
              HerWheels
            </h1>
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">
              Captain Login
            </h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full pl-10 bg-base-200 text-white focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 rounded-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full pl-10 bg-base-200 text-white focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 rounded-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary btn-block rounded-full hover:bg-blue-600 transition-colors duration-300">
                Login
              </button>
            </form>
            <p className="text-center mt-4 text-gray-800">
              Join a fleet?{" "}
              <Link to="/captain-signup" className="text-blue-600">
                Register as a Captain
              </Link>
            </p>
          </div>
          <div>
            <Link
              to="/login"
              className="btn btn-secondary btn-block rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              Sign in as User
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-20 blur-xl"></div>
    </div>
  );
};

export default Captainlogin;
