import React, { useState } from "react";

import "remixicon/fonts/remixicon.css";
import { History, House, MessageCircle, User } from "lucide-react";

const TabBar = () => {
  const [isActive, setIsActive] = useState("home");

  return (
    <div className="mb-3 tabs tabs-box bg-black mt-4 mx-3 p-2 w-full h-[65px] flex justify-evenly items-center rounded-full">
      <a href="/home" className="rounded-full">
        <div
          onClick={() => setIsActive("home")}
          className={`p-2 cursor-pointer btn ${
            isActive == "home" ? "btn-primary" : ""
          } rounded-full`}
        >
          <House />
        </div>
      </a>
      <a href="/history" className="rounded-full">
        <div
          className={`p-2 cursor-pointer btn ${
            isActive == "history" ? "btn-primary" : ""
          } rounded-full`}
          onClick={() => setIsActive("history")}
        >
          <History />
        </div>
      </a>
      <a href="/message" className="rounded-full">
        <div
          className={`p-2 cursor-pointer btn ${
            isActive == "message" ? "btn-primary" : ""
          } rounded-full`}
          onClick={() => setIsActive("message")}
        >
          <MessageCircle />
        </div>
      </a>
      <a href="/profile" className="rounded-full">
        <div
          className={`p-2 cursor-pointer btn ${
            isActive == "profile" ? "btn-primary" : ""
          } rounded-full`}
          onClick={() => setIsActive("profile")}
        >
          <User />
        </div>
      </a>
    </div>
  );
};

export default TabBar;
