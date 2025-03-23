import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-100 to-purple-100 animated-gradient">
      <div className="mockup-phone">
        <div className="mockup-phone-camera"></div>
        <div className="mockup-phone-display bg-white h-[92vh] rounded-4xl flex flex-col justify-between p-6">
          <div className="flex justify-start">
            <h1 className="text-2xl font-bold text-pink-600">HerWheels</h1>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="/onboarding.png"
              alt="Onboarding"
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Get Started with HerWheels
            </h2>
            <Link
              to="/login"
              className="btn btn-primary btn-block rounded-full"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
