import React from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {}; // Retrieve ride data
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="flex justify-center items-center pt-[22px] h-[100vh] bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="mockup-phone h-[95vh] z-10">
        <div className="mockup-phone-camera z-10"></div>
        <div className="mockup-phone-display z-10">
          <div className="h-[91vh]">
            <div className="h-[435px] overflow-hidden">
              <LiveTracking
                startPlace={ride.pickup}
                endPlace={ride.destination}
                vehicleType={ride.vehicleType}
                routeRequested={true}
              />
            </div>
            <div className="h-[44%] rounded-b-[50px] p-4 bg-white">
              <div className="flex items-center justify-between">
                <img
                  className="h-12"
                  src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                  alt=""
                />
                <div className="text-right">
                  <h2 className="text-lg font-medium capitalize text-gray-600">
                    {ride?.captain.fullname.firstname}
                  </h2>
                  <h4 className="text-xl font-semibold -mt-1 -mb-1 text-gray-600">
                    {ride?.captain.vehicle.plate}
                  </h4>
                  <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
                </div>
              </div>

              <div className="flex gap-2 justify-between flex-col items-center">
                <div className="w-full mt-5">
                  <div className="flex items-center gap-5 p-3 border-b-2">
                    <i className="text-lg ri-map-pin-2-fill text-black"></i>
                    <div>
                      <h3 className="text-lg font-medium text-gray-600">
                        562/11-A
                      </h3>
                      <p className="text-sm -mt-1 text-gray-600">
                        {ride?.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 p-3">
                    <i className="ri-currency-line text-black"></i>
                    <div>
                      <h3 className="text-lg font-medium text-gray-600">
                        ₹{ride?.fare}{" "}
                      </h3>
                      <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/home" className="cursor-pointer">
                <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
                  Make a Payment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;
