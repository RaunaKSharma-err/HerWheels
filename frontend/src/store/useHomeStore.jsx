import { create } from "zustand";

export const useHomeStore = create((set, get) => ({
  distance: null,
  duration: null,
  Fare: null,
  vehicletype: "",
  pickupCoordinates: null,
  destinationCoordinates: null,
  userLat: null,
  userLng: null,

  setFareDistanceAndDuration: ({
    distanceKm,
    durationMinutes,
    fare,
    vehicleType,
  }) => {
    set({ Fare: fare });
    set({ distance: distanceKm });
    set({ duration: durationMinutes });
    set({ vehicletype: vehicleType });
  },
  setpickupCoordinates: (pick) => {
    set({ pickupCoordinates: pick });
  },
  setdestinationCoordinates: (dest) => {
    set({ destinationCoordinates: dest });
  },
  setuserLocation: ({ lat, lng }) => {
    set({ userLat: lat, userLng: lng });
  },
}));
