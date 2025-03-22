import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <>
      <div className="flex justify-center items-center pt-[22px]">
        <div className="mockup-phone h-[95vh] z-10">
          <div className="mockup-phone-camera z-10"></div>
          <div className="mockup-phone-display z-10">
            <div className="bg-cover bg-center rounded-[49px] bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-[91vh] pt-8 flex justify-between flex-col w-full">
              <h1 className="w-16 ml-10 font-extrabold text-2xl text-pink-600">HerWheels</h1>
              <div className="bg-white pb-8  px-4 rounded-b-[49px]">
                <h2 className="text-[30px] font-semibold">
                  Get Started with HerWheels
                </h2>
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
