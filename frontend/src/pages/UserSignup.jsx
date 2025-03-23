import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { User, Mail, Lock } from "lucide-react"; // lucide icons

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullname: { firstname: firstName, lastname: lastName },
        email: email,
        password: password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
      <div className="mockup-phone z-10">
        <div className="mockup-phone-camera"></div>
        <div className="mockup-phone-display bg-white h-[92vh] rounded-4xl flex flex-col justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold text-pink-600 mb-6 mt-2 animate-pulse">
              HerWheels
            </h1>
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">
              Create an account
            </h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="First name"
                  className="input input-bordered w-full pl-10 bg-base-200 text-white focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 rounded-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Last name"
                  className="input input-bordered w-full pl-10 bg-base-200 text-white focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 rounded-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
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
                Create account
              </button>
            </form>
            <p className="text-center mt-4 text-gray-800">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login here
              </Link>
            </p>
          </div>
          <div>
            <p className="text-xs leading-tight text-center text-gray-500">
              This site is protected by reCAPTCHA and the{" "}
              <a
                href="https://policies.google.com/privacy"
                className="underline"
              >
                Google Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" className="underline">
                Terms of Service apply
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-20 blur-xl"></div>
    </div>
  );
};

export default UserSignup;
