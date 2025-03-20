const captainModel = require("../models/captain.model");

// ✅ Find Captains in a Given Radius (MongoDB Geo Query)
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius / 6371], // Convert radius to radians
      },
    },
  });

  return captains;
};
