import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useHomeStore } from "../store/useHomeStore";

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

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setuserLocation({ lat: latitude, lng: longitude });
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
      latitude: userLocation.lat,
      longitude: userLocation.lng,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <div className="flex justify-center items-center pt-[22px]">
      <div className="mockup-phone h-[95vh] z-10">
        <div className="mockup-phone-camera z-10"></div>
        <div className="mockup-phone-display z-10">
          <div className="p-3 h-screen flex flex-col justify-between">
            <div>
              <h1 className="w-16 ml-6 mb-5 font-extrabold text-2xl text-pink-600">
                HerWheels
              </h1>

              <h1 className=" ml-6 my-10 font-bold text-center text-xl text-white">
                LogIn to your captain account
              </h1>

              <form
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <h3 className="text-lg w-full  font-medium mb-2">
                  What's our Captain's name
                </h3>
                <div className="flex gap-4 mb-7">
                  <input
                    required
                    className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-black text-lg placeholder:text-base"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <input
                    required
                    className="bg-[#eeeeee] w-1/2 text-black rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>

                <h3 className="text-lg font-medium mb-2">
                  What's our Captain's email
                </h3>
                <input
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-[#eeeeee] mb-7 rounded-lg text-black px-4 py-2 border w-full text-lg placeholder:text-base"
                  type="email"
                  placeholder="email@example.com"
                />

                <h3 className="text-lg font-medium mb-2">Enter Password</h3>

                <input
                  className="bg-[#eeeeee] mb-7 rounded-lg text-black px-4 py-2 border w-full text-lg placeholder:text-base"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  type="password"
                  placeholder="password"
                />

                <h3 className="text-lg font-medium mb-2">
                  Vehicle Information
                </h3>
                <div className="flex gap-4 mb-7">
                  <input
                    required
                    className="bg-[#eeeeee] w-1/2 rounded-lg text-black px-4 py-2 border text-lg placeholder:text-base"
                    type="text"
                    placeholder="Vehicle Color"
                    value={vehicleColor}
                    onChange={(e) => {
                      setVehicleColor(e.target.value);
                    }}
                  />
                  <input
                    required
                    className="bg-[#eeeeee] w-1/2 rounded-lg text-black px-4 py-2 border text-lg placeholder:text-base"
                    type="text"
                    placeholder="Vehicle Plate"
                    value={vehiclePlate}
                    onChange={(e) => {
                      setVehiclePlate(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-4 mb-7">
                  <input
                    required
                    className="bg-[#eeeeee] w-1/2 rounded-lg text-black px-4 py-2 border text-lg placeholder:text-base"
                    type="number"
                    placeholder="Vehicle Capacity"
                    value={vehicleCapacity}
                    onChange={(e) => {
                      setVehicleCapacity(e.target.value);
                    }}
                  />
                  <select
                    required
                    className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                    value={vehicleType}
                    onChange={(e) => {
                      setVehicleType(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Vehicle Type
                    </option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="moto">Moto</option>
                  </select>
                </div>

                <button className="bg-[#111] cursor-pointer text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
                  Create Captain Account
                </button>
              </form>
              <p className="text-center">
                Already have a account?{" "}
                <Link to="/captain-login" className="text-blue-600">
                  Login here
                </Link>
              </p>
            </div>
            <div>
              <p className="text-[10px] mt-6 leading-tight">
                This site is protected by reCAPTCHA and the{" "}
                <span className="underline">Google Privacy Policy</span> and{" "}
                <span className="underline">Terms of Service apply</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
