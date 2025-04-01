import React from "react";
import TabBar from "../components/tabBar";

const UserMessage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen pt-[22px] bg-gradient-to-br from-pink-100 to-purple-100 animated-gradient">
        <div className="mockup-phone h-[95vh] z-10">
          <div className="mockup-phone-camera z-100"></div>
          <div className="mockup-phone-display z-10">
            <div className="h-[91vh] bg-white rounded-b-[49px] overflow-hidden flex-col">
              <div className="text-black font-bold h-[80vh] flex justify-center items-center">
                message Page
              </div>
              <div className="flex justify-center items-center">
                <TabBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMessage;
