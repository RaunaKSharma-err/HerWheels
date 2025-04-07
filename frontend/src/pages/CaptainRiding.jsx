import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";
import { useHomeStore } from "../store/useHomeStore";
import { LogOut, Menu } from "lucide-react";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  const { distanceKm } = useHomeStore();

  // GSAP Animation
  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      y: finishRidePanel ? 0 : "100%",
      autoAlpha: finishRidePanel ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [finishRidePanel]);

  return (
    <div className="flex justify-center items-center pt-[22px] bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="mockup-phone h-[95vh] z-10">
        <div className="mockup-phone-camera z-10"></div>

        <div className="mockup-phone-display z-10 relative overflow-hidden">
          <div className="h-[91vh] flex flex-col justify-end">
            {/* Header */}
            <div className="absolute p-6 top-0 flex items-center justify-between w-full z-10">
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

            {/* Bottom Ride Info Bar */}
            <div
              className="h-[225px] ml-[1px] p-6 flex flex-col items-center justify-between bg-white pt-10 rounded-b-[45px] z-20"
              onClick={() => setFinishRidePanel(true)}
            >
              <h5 className="p-1 text-center w-full h-[20px]">
                <i className="text-3xl text-gray-400 ri-arrow-up-wide-line"></i>
              </h5>
              <div className="flex justify-between w-full items-center">
                <h4 className="text-xl font-semibold text-gray-600">
                  {distanceKm || "4km away"}
                </h4>
                <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
                  Complete Ride
                </button>
              </div>
            </div>

            {/* Finish Ride Panel */}
            <div
              ref={finishRidePanelRef}
              className="absolute bottom-0 left-0 w-full translate-y-full opacity-0 bg-white px-3 py-10 pt-12 z-30"
            >
              <FinishRide
                ride={rideData}
                setFinishRidePanel={setFinishRidePanel}
              />
            </div>

            {/* Background Map */}
            <div className="h-full absolute w-full top-0 z-0">
              <LiveTracking
                startPlace={rideData.pickup}
                endPlace={rideData.destination}
                vehicleType={rideData.vehicleType}
                routeRequested={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
