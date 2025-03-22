const captainModel = require("../models/captain.model");

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
  try {
    const nearbyCaptains = await captainModel.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 2000,
        },
      },
    });

    console.log(`Found ${nearbyCaptains.length} captains nearby`);
    return nearbyCaptains;
  } catch (error) {
    console.error("Error finding captains:", error);
    return [];
  }
};
