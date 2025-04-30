import React from "react";
import TabBar from "../components/tabBar";
import {
  User as UserIcon,
  MapPin,
  Phone,
  Mail,
  Edit,
  Camera,
} from "lucide-react";

const UserProfile = () => {
  const userName = "Alex Mercer";
  const location = "Kalaiya, Nepal";
  const phone = "+977 98XXXXXXXX";
  const email = "alex.mercer@example.com";
  const memberSince = "Jan 2024";
  const rating = 4.8; // Example rating

  return (
    <div className="flex justify-center items-center h-screen pt-[22px] bg-gradient-to-br from-pink-100 to-purple-100 animated-gradient">
      <div className="mockup-phone h-[95vh] z-10 shadow-xl">
        <div className="mockup-phone-camera z-100"></div>
        <div className="mockup-phone-display h-[770px] z-10 bg-white rounded-b-[50px] overflow-hidden flex flex-col">
          {/* Cover Photo and Profile Header */}
          <div className="relative">
            <img
              src={
                "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1385&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="Profile Cover"
              className="w-full h-48 object-cover rounded-t-[49px]"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white p-1 shadow-md border-2 border-white flex items-center justify-center">
              <img
                src={
                  "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1385&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Profile Picture"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute bottom-2 right-2 transform translate-x-1/4 translate-y-1/4 bg-[#8482ff] rounded-full p-1 shadow-sm border-2 border-white cursor-pointer">
                <Camera className="text-white" size={14} />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="px-6 pt-12 pb-4 text-center">
            <h2 className="font-bold text-2xl text-gray-800">{userName}</h2>
            <div className="flex items-center justify-center text-sm text-gray-600 mt-1">
              <MapPin className="mr-2" size={14} />
              {location}
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Member since {memberSince}
            </p>
            <div className="flex justify-center items-center mt-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 3.545 1.123 6.545z" />
                </svg>
              ))}
              <span className="text-gray-600 ml-2 text-sm">
                ({rating.toFixed(1)})
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 py-4 px-6 mt-4">
            <h3 className="font-semibold text-gray-700 mb-3">
              Contact Information
            </h3>
            <div className="flex items-center mb-2 text-gray-600">
              <Phone className="mr-3" size={16} />
              {phone}
            </div>
            <div className="flex items-center mb-2 text-gray-600">
              <Mail className="mr-3" size={16} />
              {email}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 mt-4">
            <button className="w-full bg-[#524ff8] cursor-pointer hover:bg-[#817ffd] text-white font-semibold py-3 rounded-md shadow-sm flex items-center justify-center">
              <Edit className="mr-2" size={16} /> Edit Profile
            </button>
          </div>

          {/* Tab Bar */}
          <div className="flex justify-center items-center flex-shrink-0 mt-auto">
            <TabBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
