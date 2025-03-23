import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import { useHomeStore } from "../store/useHomeStore";
import {
  Bell,
  Bike,
  History,
  House,
  MapPin,
  Menu,
  MessageCircle,
  NotebookIcon,
  Search,
  User,
} from "lucide-react";

const Home = () => {
  const { Fare, pickupCoordinates, destinationCoordinates } = useHomeStore();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [routeRequested, setrouteRequested] = useState(false);
  const [rideDetails, setrideDetails] = useState({});
  const [isActive, setIsActive] = useState("home");

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  const fetchLocationSuggestions = async (query, setSuggestions) => {
    if (!query) return;
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=1e02dc5e630c241114c0a27b793012d7`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleLocationSelect = (place, setLocation) => {
    setLocation(place.name);
    setPickupSuggestions([]);
    setDestinationSuggestions([]);
  };

  async function findTrip() {
    setVehiclePanel(true);
    // Fetch distance and duration logic here
  }

  async function createRide() {
    const fare = await Fare;
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        pickupCoordinates,
        destinationCoordinates,
        Fare,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setrideDetails(response);
  }

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          zIndex: 30,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
          zIndex: 30,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          zIndex: 1,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
          zIndex: 1,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="flex justify-center items-center h-screen pt-[22px] bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="mockup-phone h-[95vh] z-10">
        <div className="mockup-phone-camera z-100"></div>
        <div className="mockup-phone-display z-10">
          <div className="h-[91vh] rounded-b-[49px] relative overflow-hidden">
            {/* <h1 className="w-16 ml-6 mb-5 font-extrabold text-2xl text-pink-600">
              HerWheels
            </h1> */}
            <div className="h-screen w-screen relative">
              {/* image for temporary use  */}
              <LiveTracking
                startPlace={pickup}
                endPlace={destination}
                vehicleType={vehicleType}
                routeRequested={routeRequested}
              />
              <div className="absolute top-12 left-82 btn border-none bg-white rounded-full p-2 z-50 ">
                <Bell color="blue" />
              </div>
              <div className="absolute top-12 left-5 btn border-none bg-white rounded-full p-2 z-50 ">
                <Menu color="blue" />
              </div>
            </div>
            <div className=" flex flex-col rounded-b-[49px] justify-end h-screen absolute top-0 w-full">
              <div
                className={`h-[45%] p-6 bg-white rounded-t-2xl rounded-b-[49px] z-50 relative ${
                  panelOpen ? "z-50" : ""
                }`}
              >
                <h5
                  ref={panelCloseRef}
                  onClick={() => {
                    setPanelOpen(false);
                  }}
                  className="absolute opacity-0 right-6 top-6 text-2xl"
                >
                  <i className="ri-arrow-down-wide-line"></i>
                </h5>
                <p className="text-xl font-semibold  text-black">
                  <Bike className="inline-flex" />
                  {"    "}
                  <span>Start riding now ...</span>
                </p>
                <form
                  className="relative py-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="input bg-slate-200 rounded-full mb-2">
                    <MapPin color="black" className="ml-2" />
                    <input
                      onClick={() => setActiveField("pickup")}
                      value={pickup}
                      onChange={(e) => {
                        setPickup(e.target.value);
                        fetchLocationSuggestions(
                          e.target.value,
                          setPickupSuggestions
                        );
                      }}
                      className="px-3 py-2 text-lg text-gray-800 rounded-full w-full"
                      type="text"
                      placeholder="Add a pick-up location"
                    />
                  </label>
                  {pickupSuggestions.length > 0 && (
                    <ul className="bg-black text-white shadow-md rounded-lg absolute w-full z-50">
                      {pickupSuggestions.map((place, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer"
                          onClick={() => handleLocationSelect(place, setPickup)}
                        >
                          {place.name}, {place.state}, {place.country}
                        </li>
                      ))}
                    </ul>
                  )}
                  <label className="input bg-slate-200 rounded-full">
                    <MapPin color="black" className="ml-2" />
                    <input
                      onClick={() => setActiveField("destination")}
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                        fetchLocationSuggestions(
                          e.target.value,
                          setDestinationSuggestions
                        );
                      }}
                      className="px-3 py-2 text-lg text-gray-800 rounded-full w-full"
                      type="text"
                      placeholder="Enter your destination"
                    />
                  </label>
                  {destinationSuggestions.length > 0 && (
                    <ul className="bg-black shadow-md rounded-lg absolute w-full z-50">
                      {destinationSuggestions.map((place, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer"
                          onClick={() =>
                            handleLocationSelect(place, setDestination)
                          }
                        >
                          {place.name}, {place.state}, {place.country}
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
                <button
                  onClick={() => {
                    findTrip(),
                      setrouteRequested(true),
                      console.log(routeRequested);
                  }}
                  className="btn-primary btn text-white px-4 py-2 rounded-lg mt-3 w-full"
                >
                  Find Trip
                </button>
                <div className="tabs tabs-box bg-black mt-5 p-2 w-full h-[65px] flex justify-evenly items-center rounded-full">
                  <div className="rounded-full">
                    <div
                      onClick={() => setIsActive("home")}
                      className={`p-2 cursor-pointer ${
                        isActive == "home" ? "btn-primary btn" : ""
                      } rounded-full`}
                    >
                      <House />
                    </div>
                  </div>
                  <div className="rounded-full">
                    <div
                      className={`p-2 cursor-pointer ${
                        isActive == "history" ? "btn-primary btn" : ""
                      } rounded-full`}
                      onClick={() => setIsActive("history")}
                    >
                      <History />
                    </div>
                  </div>
                  <div className="rounded-full">
                    <div
                      className={`p-2 cursor-pointer ${
                        isActive == "message" ? "btn-primary btn" : ""
                      } rounded-full`}
                      onClick={() => setIsActive("message")}
                    >
                      <MessageCircle />
                    </div>
                  </div>
                  <div className="rounded-full">
                    <div
                      className={`p-2 cursor-pointer ${
                        isActive == "profile" ? "btn-primary btn" : ""
                      } rounded-full`}
                      onClick={() => setIsActive("profile")}
                    >
                      <User />
                    </div>
                  </div>
                </div>
              </div>
              <div ref={panelRef} className="bg-white h-0">
                <LocationSearchPanel
                  suggestions={
                    activeField === "pickup"
                      ? pickupSuggestions
                      : destinationSuggestions
                  }
                  setPanelOpen={setPanelOpen}
                  setVehiclePanel={setVehiclePanel}
                  setPickup={setPickup}
                  setDestination={setDestination}
                  activeField={activeField}
                />
              </div>
            </div>
            <div
              ref={vehiclePanelRef}
              className="fixed w-[390px] z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
              <VehiclePanel
                selectVehicle={setVehicleType}
                fare={Fare}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehiclePanel={setVehiclePanel}
              />
            </div>
            <div
              ref={confirmRidePanelRef}
              className="fixed w-[390px] z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
            >
              <ConfirmRide
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={Fare}
                vehicleType={vehicleType}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehicleFound={setVehicleFound}
              />
            </div>
            <div
              ref={vehicleFoundRef}
              className="fixed w-[390px] z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
            >
              <LookingForDriver
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={Fare}
                vehicleType={vehicleType}
                setVehicleFound={setVehicleFound}
              />
            </div>
            <div
              ref={waitingForDriverRef}
              className="fixed w-[390px] z-10 bottom-0  bg-white px-3 py-6 pt-12"
            >
              <WaitingForDriver
                ride={ride}
                setVehicleFound={setVehicleFound}
                setWaitingForDriver={setWaitingForDriver}
                waitingForDriver={waitingForDriver}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
