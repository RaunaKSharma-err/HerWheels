const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async ({ userId, location }) => {
      try {
        if (!location || !location.lat || !location.lng) {
          console.error("❌ Invalid location data received:", location);
          return;
        }

        const updatedCaptain = await captainModel.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              "location.type": "Point",
              "location.coordinates": [location.lng, location.lat], // MongoDB expects [lng, lat]
            },
          },
          { new: true } // Returns the updated document
        );

        if (!updatedCaptain) {
          console.log("🚨 Captain not found for ID:", userId);
        } else {
          console.log(
            `✅ Location updated for ${userId}: ${updatedCaptain.location.coordinates}`
          );
        }
      } catch (err) {
        console.error("❌ Error updating captain location:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("❌ Socket.io not initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
