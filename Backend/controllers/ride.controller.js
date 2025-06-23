const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  // }

  const { pickup, destination, Fare, pickupCoordinates } = req.body;

  try {
    // Step 1: Create a ride in the database
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      Fare,
    });

    // Step 2: Find captains within 2km radius
    console.log("Searching for captains near:", pickupCoordinates);
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2 // 2km radius
    );

    // Step 3: If no captains found, return an error
    if (captainsInRadius.length === 0) {
      console.log("❌ No captains found nearby!");
      return res.status(404).json({ message: "No captains available nearby." });
    }

    console.log(`✅ Found ${captainsInRadius.length} captains nearby`);

    // Step 4: Populate ride details with user data
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    // Step 5: Notify nearby captains via WebSockets
    captainsInRadius.forEach((captain) => {
      if (captain.socketId) {
        console.log(
          `🚀 Sending ride request to Captain: ${captain.fullname.firstname}`
        );
        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });
      }
    });

    return res.status(201).json(ride);
  } catch (err) {
    console.error("❌ Error creating ride:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
