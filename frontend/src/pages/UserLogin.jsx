import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center pt-[22px]">
      <div className="mockup-phone h-[95vh] z-10">
        <div className="mockup-phone-camera"></div>
        <div className="mockup-phone-display z-10">
          <div className="p-3 h-[91vh] w-full flex flex-col justify-between">
            <div>
              <h1 className="w-16 ml-6 mb-5 font-extrabold text-2xl text-pink-600">
                HerWheels
              </h1>

              <h1 className="ml-6 my-12 font-bold text-center text-xl text-white">
                Log In to your account!
              </h1>

              <form
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <h3 className="text-lg font-medium mb-2 text-slate-300">
                  What's your email
                </h3>
                <input
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-black mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                  type="email"
                  placeholder="email@example.com"
                />

                <h3 className="text-lg font-medium mb-2 text-slate-300">
                  Enter Password
                </h3>

                <input
                  className="bg-black mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  type="password"
                  placeholder="password"
                />

                <button className="bg-[#10b461] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base cursor-pointer ">
                  Login
                </button>
              </form>
              <p className="text-center">
                New here?{" "}
                <Link to="/signup" className="text-blue-800">
                  Create new Account
                </Link>
              </p>
            </div>
            <div>
              <Link
                to="/captain-login"
                className="bg-[#111] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
              >
                Sign in as Captain
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
