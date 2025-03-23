import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DoorOpen } from "lucide-react"; // Lucide icon

const CaptainLogout = () => {
  const token = localStorage.getItem("captain-token");
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(true); // Track logout state

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("captain-token");
          navigate("/captain-login");
        } else {
          console.error("Logout failed with status:", response.status);
          navigate("/captain-login");
        }
      } catch (error) {
        console.error("Logout error:", error);
        navigate("/captain-login");
      } finally {
        setIsLoggingOut(false);
      }
    };

    if (token) {
      logoutCaptain();
    } else {
      navigate("/captain-login");
    }
  }, [navigate, token]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-100 to-purple-100 transition-opacity duration-500 ease-in-out">
      {isLoggingOut ? (
        <div className="flex flex-col items-center justify-center text-gray-800">
          <DoorOpen className="w-16 h-16 animate-spin-slow mb-4" />
          <p className="text-xl font-semibold">Logging out...</p>
        </div>
      ) : (
        <div className="text-center text-gray-800">
          <p>Redirecting to login...</p>
        </div>
      )}
    </div>
  );
};

export default CaptainLogout;
