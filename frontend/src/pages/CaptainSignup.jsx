import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CapatainContext";
import { User, Mail, Lock, Car, MapPin } from "lucide-react";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [userLocation, setuserLocation] = useState({});
  const { setCaptain } = React.useContext(CaptainDataContext);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setuserLocation({ lat: latitude, lng: longitude });
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const captainData = {
        fullname: { firstname: firstName, lastname: lastName },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType,
        },
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );
      if (response.status === 201) {
        const { captain, token } = response.data;
        setCaptain(captain);
        localStorage.setItem("token", token);
        navigate("/captain-home");
      } else {
        console.error("Signup failed with status:", response.status);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-100 to-purple-100 animated-gradient relative overflow-hidden">
      <div className="mockup-phone border-primary z-10">
        <div className="mockup-phone-camera"></div>
        <div className="mockup-phone-display bg-white h-[92vh] rounded-4xl flex flex-col justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold text-pink-600 mb-6 animate-pulse">
              HerWheels
            </h1>
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">
              Captain Signup
            </h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="First name"
                  className="input input-bordered w-full pl-10 rounded-full text-white"
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
                  className="input input-bordered w-full pl-10 rounded-full text-white"
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
                  className="input input-bordered w-full pl-10 rounded-full text-white"
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
                  className="input input-bordered w-full pl-10 rounded-full text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2 text-center text-gray-800">
                  Vehicle Information
                </h3>
                <div className="relative">
                  <Car className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Vehicle Color"
                    className="input input-bordered w-full pl-10 rounded-full text-white"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    required
                  />
                </div>
                <div className="relative mt-2">
                  <Car className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Vehicle Plate"
                    className="input input-bordered w-full pl-10 rounded-full text-white"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    required
                  />
                </div>
                <div className="relative mt-2">
                  <Car className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Vehicle Capacity"
                    className="input input-bordered w-full pl-10 rounded-full text-white"
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    required
                  />
                </div>
                <select
                  className="select select-bordered w-full mt-2 rounded-full text-slate-400"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
              {loadingLocation && (
                <div className="flex items-center justify-center mt-4">
                  <MapPin className="animate-pulse w-6 h-6 text-pink-500" />
                  <p className="ml-2 text-gray-800">Getting your location...</p>
                </div>
              )}
              <button className="btn btn-primary btn-block rounded-full mt-4">
                Create Captain Account
              </button>
            </form>
            <p className="text-center mt-4 text-gray-800">
              Already have an account?{" "}
              <Link to="/captain-login" className="text-blue-600">
                Login here
              </Link>
            </p>
          </div>
          <p className="text-xs leading-tight text-center text-gray-500 mt-4">
            This site is protected by reCAPTCHA and the{" "}
            <a href="https://policies.google.com/privacy" className="underline">
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
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-20 blur-xl"></div>
    </div>
  );
};

export default CaptainSignup;
