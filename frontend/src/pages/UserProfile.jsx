import React from "react";
import TabBar from "../components/tabBar";

const UserProfile = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen pt-[22px] bg-gradient-to-br from-pink-100 to-purple-100 animated-gradient">
        <div className="mockup-phone h-[95vh] z-10">
          <div className="mockup-phone-camera z-100"></div>
          <div className="mockup-phone-display z-10">
            <div className="h-[91vh] bg-white rounded-b-[49px] overflow-hidden flex-col">
              <div className="text-black font-bold h-[80vh] flex justify-center items-center">
                <div className="bg-white text-black w-full h-full rounded-t-lg p-6 ">
                  <div className="text-center mb-5">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mt-8 mb-2 relative">
                      <img
                        src="profile.jpg"
                        alt="Profile Picture"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 rounded-full"></div>
                    </div>
                    <h2 className="text-xl font-semibold">Victoria Heard</h2>
                    <p className="text-sm text-gray-400">
                      Active since Jul, 2019
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium">
                        Personal Information
                      </h3>
                      <a href="#" className="text-blue-500 text-sm">
                        Edit
                      </a>
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src="email-icon.png"
                        alt="Email"
                        className="w-5 h-5 mr-2"
                      />
                      <p className="text-sm">heard.j@gmail.com</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src="phone-icon.png"
                        alt="Phone"
                        className="w-5 h-5 mr-2"
                      />
                      <p className="text-sm">9898712132</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src="website-icon.png"
                        alt="Website"
                        className="w-5 h-5 mr-2"
                      />
                      <p className="text-sm">www.randomweb.com</p>
                    </div>
                    <div className="flex items-center">
                      <img
                        src="location-icon.png"
                        alt="Location"
                        className="w-5 h-5 mr-2"
                      />
                      <p className="text-sm">Antigua</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Utilities</h3>
                    <ul className="divide-y divide-zinc-800">
                      <li className="py-2 flex justify-between items-center">
                        <a href="#" className="text-sm">
                          Downloads
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </li>
                      <li className="py-2 flex justify-between items-center">
                        <a href="#" className="text-sm">
                          Usage Analytics
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </li>
                      <li className="py-2 flex justify-between items-center">
                        <a href="#" className="text-sm">
                          Ask Help Desk
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </li>
                      <li className="py-2 flex justify-between items-center">
                        <a href="#" className="text-sm">
                          Log Out
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white flex justify-center items-center">
                <TabBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
