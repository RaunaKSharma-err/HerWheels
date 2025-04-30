import React from "react";
import TabBar from "../components/tabBar";
import { Search, Edit } from "lucide-react";

const UserMessage = () => {
  return (
    <div className="flex justify-center items-center h-screen pt-[22px] bg-gradient-to-br from-pink-100 to-purple-100 animated-gradient">
      <div className="mockup-phone h-[95vh] z-10 shadow-xl">
        <div className="mockup-phone-camera z-100"></div>
        <div className="mockup-phone-display h-[770px] z-10 bg-white rounded-b-[50px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#8482ff] text-white py-4 px-6 flex items-center justify-between rounded-t-[49px]">
            <h2 className="font-semibold text-xl">Messages</h2>
            <div className="flex items-center space-x-4">
              <Search className="text-lg cursor-pointer" />
              <Edit className="text-lg cursor-pointer" />
            </div>
          </div>

          {/* Message List */}
          <div className="flex-grow overflow-y-auto p-4">
            {/* Sample Message Item */}
            <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-purple-500">
                AS
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">Alice Smith</h3>
                <p className="text-sm text-gray-500 truncate">
                  Hey, how are you doing today?
                </p>
              </div>
              <span className="text-xs text-gray-400">10:30 AM</span>
            </div>

            {/* Another Sample Message Item */}
            <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center font-semibold text-blue-500">
                BJ
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">Bob Johnson</h3>
                <p className="text-sm text-gray-500 truncate">
                  Just wanted to check in!
                </p>
              </div>
              <span className="text-xs text-gray-400">Yesterday</span>
            </div>

            {/* Add more message items here */}
            <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center font-semibold text-green-500">
                CD
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">Charlie Davis</h3>
                <p className="text-sm text-gray-500 truncate">
                  Meeting at 2 PM tomorrow.
                </p>
              </div>
              <span className="text-xs text-gray-400">2 days ago</span>
            </div>
            {/* ... more messages ... */}
          </div>

          {/* Tab Bar */}
          <div className="flex justify-center items-center">
            <TabBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
