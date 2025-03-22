const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
  latitude,
  longitude,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType ||
    latitude == null ||
    longitude == null
  ) {
    throw new Error("All fields are required, including location");
  }

  // Hash password before storing
  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password: hashedPassword,
    status: "active",
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  });

  return captain;
};
