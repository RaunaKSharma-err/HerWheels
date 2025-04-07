import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CapatainContext";
import axios from "axios";
import { LogOut, Menu } from "lucide-react";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

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
  };

  useEffect(() => {
    if (!captain || !socket) return;
    socket.emit("join", { userId: captain._id, userType: "captain" });
    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000);
    return () => clearInterval(locationInterval);
  }, [socket, captain]);

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
  }, [socket]);

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
  }

  // GSAP Animation for Ride Popup
  useEffect(() => {
    if (!ridePopupPanelRef.current) return;

    const tl = gsap.timeline();

    if (ridePopupPanel) {
      tl.to(ridePopupPanelRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      tl.to(ridePopupPanelRef.current, {
        y: "100%",
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    return () => tl.kill();
  }, [ridePopupPanel]);

  // GSAP Animation for Confirm Ride Popup
  useEffect(() => {
    if (!confirmRidePopupPanelRef.current) return;

    const tl = gsap.timeline();

    if (confirmRidePopupPanel) {
      tl.to(confirmRidePopupPanelRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      tl.to(confirmRidePopupPanelRef.current, {
        y: "100%",
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    return () => tl.kill();
  }, [confirmRidePopupPanel]);

  return (
    <div className="flex justify-center items-center pt-[22px] h-[100vh] bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="mockup-phone h-[95vh] z-10">
        <div className="mockup-phone-camera z-100"></div>
        <div className="mockup-phone-display z-10 relative">
          <div className="h-[91vh]">
            <div className="fixed p-6 top-15 flex items-center justify-between w-[390px]">
              <Link
                to="/captain-home"
                className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
              >
                <Menu color="blue" />
              </Link>
              <Link
                to="/captain-signup"
                className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
              >
                <LogOut color="blue" size={21} />
              </Link>
            </div>
            <div className="h-[65vh]">
              <img
                className="h-full w-full object-cover"
                src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                alt="Map GIF"
              />
            </div>
            <div className="p-5 rounded-b-[50px] bg-white">
              <CaptainDetails />
            </div>

            {/* Ride Popup */}
            <div
              ref={ridePopupPanelRef}
              className="absolute w-full bottom-0 opacity-0 bg-white px-3 py-10 pt-12 overflow-hidden"
            >
              <RidePopUp
                ride={ride}
                setRidePopupPanel={setRidePopupPanel}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                confirmRide={confirmRide}
              />
            </div>

            {/* Confirm Ride Popup */}
            <div
              ref={confirmRidePopupPanelRef}
              className="absolute w-full h-full bottom-0 opacity-0 bg-white px-3 py-10 pt-12 overflow-hidden"
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
