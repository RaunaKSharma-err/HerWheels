import React from "react";
import TabBar from "../components/tabBar";
import { ArrowLeft, Calendar, MapPin } from "lucide-react"; // Importing relevant Lucide icons

const History = () => {
  // Sample ride history data (replace with your actual data fetching)
  const rideHistory = [
    {
      id: 1,
      date: "April 29, 2025",
      time: "6:30 PM",
      pickup: "Birgunj, Mithilanagar",
      dropoff: "kalaiya",
      price: "Rs. 350",
    },
    {
      id: 2,
      date: "April 28, 2025",
      time: "11:15 AM",
      pickup: "Boudhanath Stupa",
      dropoff: "Swoyambhunath Temple",
      price: "Rs. 420",
    },
    {
      id: 3,
      date: "April 27, 2025",
      time: "9:00 AM",
      pickup: "Pulchowk, Lalitpur",
      dropoff: "Koteshwor, Kathmandu",
      price: "Rs. 580",
    },
    // Add more ride history items here
  ];

  return (
    <div className="flex justify-center items-center h-screen pt-[22px] bg-gradient-to-br from-pink-100 to-purple-100 animated-gradient">
      <div className="mockup-phone h-[95vh] z-10 shadow-xl">
        <div className="mockup-phone-camera z-100"></div>
        <div className="mockup-phone-display h-[770px] z-10 bg-white rounded-b-[50px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#8482ff] text-white py-4 px-6 flex items-center shadow-sm rounded-t-[49px]">
            <h2 className="font-semibold text-lg text-white">Ride History</h2>
          </div>

          {/* Ride History List */}
          <div className="flex-grow overflow-y-auto p-4">
            {rideHistory.length > 0 ? (
              rideHistory.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-white rounded-md shadow-sm p-4 mb-4 border border-gray-200"
                >
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="mr-2" size={16} />
                    {ride.date}, {ride.time}
                  </div>
                  <div className="flex items-center mb-1">
                    <MapPin className="text-purple-500 mr-2" size={18} />
                    <span className="font-semibold text-gray-800 text-sm">
                      Pickup:
                    </span>
                    <span className="ml-1 text-gray-700 text-sm">
                      {ride.pickup}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="text-blue-500 mr-2" size={18} />
                    <span className="font-semibold text-gray-800 text-sm">
                      Dropoff:
                    </span>
                    <span className="ml-1 text-gray-700 text-sm">
                      {ride.dropoff}
                    </span>
                  </div>
                  <div className="flex justify-end items-center">
                    <span className="font-semibold text-green-600 text-lg">
                      {ride.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No ride history available.
              </div>
            )}
          </div>

          {/* Tab Bar */}
          <div className="flex justify-center items-center flex-shrink-0">
            <TabBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
