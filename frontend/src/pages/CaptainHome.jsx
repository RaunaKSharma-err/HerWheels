import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CapatainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext); // Function to update captain's location in real-time

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: { lat: latitude, lng: longitude },
          });
          console.log(
            `📍 Location Updated: [Lat: ${latitude}, Lng: ${longitude}]`
          );
        },
        (error) => console.error("🚨 Geolocation error:", error),
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 10000,
        }
      );
    }
  }; // Effect to handle socket connections and location updates

  useEffect(() => {
    if (!captain || !socket) return;
    socket.emit("join", { userId: captain._id, userType: "captain" });
    updateLocation(); // Send location immediately
    const locationInterval = setInterval(updateLocation, 10000); // Update every 10 sec
    return () => clearInterval(locationInterval); // Cleanup interval
  }, [socket, captain]); // Effect to handle socket events (ride requests, errors, etc.)

  useEffect(() => {
    const handleConnectError = (err) =>
      console.error("Socket connection error:", err);
    const handleNewRide = (data) => {
      setRide(data);
      setRidePopupPanel(true);
    };

    socket.on("connect_error", handleConnectError);
    socket.on("new-ride", handleNewRide);
    return () => {
      socket.off("connect_error", handleConnectError);
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]); // Function to confirm a ride

  async function confirmRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.error("🚨 Error confirming ride:", error);
      alert("Failed to confirm ride. Please try again.");
    }
  } // GSAP Animations for Ride Popup Panel

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [ridePopupPanel]); // GSAP Animations for Confirm Ride Popup Panel

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="flex justify-center items-center pt-[22px]">
      <div className="mockup-phone h-[95vh] z-10 ">
        <div className="mockup-phone-camera z-10"></div>
        <div className="mockup-phone-display z-10">
          <div className="h-[91vh]">
            <h1 className="w-16 ml-6 mb-5 font-extrabold text-2xl text-pink-600">
              HerWheels
            </h1>
            <div className="fixed p-6 top-4 flex items-center justify-center w-[700px]">
              <Link
                to="/captain-signup"
                className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
              >
                <i className="text-lg font-medium ri-logout-box-r-line text-black"></i>
              </Link>
            </div>
            <div className="h-3/5">
              <img
                className="h-full w-full object-cover"
                src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                alt="Map GIF"
              />
            </div>
            <div className="h-2/5 p-6">
              <CaptainDetails />
            </div>
            <div
              ref={ridePopupPanelRef}
              className="fixed w-[390px] z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
              <RidePopUp
                ride={ride}
                setRidePopupPanel={setRidePopupPanel}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                confirmRide={confirmRide}
              />
            </div>
            <div
              ref={confirmRidePopupPanelRef}
              className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
              <ConfirmRidePopUp
                ride={ride}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                setRidePopupPanel={setRidePopupPanel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
